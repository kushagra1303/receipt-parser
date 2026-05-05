import axios from "axios";

export default function Upload({ setData }: any) {

  const normalizeData = (data: any) => ({
    merchant: data.merchant || "",
    date: data.date || "",
    total: data.total || "",
    items: (data.items || []).map((item: any) => ({
      name: item.name || item.description || "",
      amount: item.amount || item.price || 0,
      quantity: item.quantity || 1
    }))
  });

  const handleUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/receipt",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      console.log("RAW RESPONSE:", res.data);

      const cleaned = normalizeData(res.data);

      console.log("CLEANED DATA:", cleaned);

      setData(cleaned);

    } catch (err: any) {
      console.error("UPLOAD ERROR:", err.response?.data || err.message);
      alert("Upload failed. Check backend logs.");
    }
  };

  return (
    <div className="upload-container">
  <p className="upload-text">Click to upload receipt</p>

  <input
    type="file"
    className="file-input"
    onChange={handleUpload}
  />
</div>
  );
}