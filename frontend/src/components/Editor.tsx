import { useState } from "react";
import axios from "axios";

export default function Editor({ data }: any) {
  const [receipt, setReceipt] = useState(data);

  const updateField = (key: string, value: any) => {
    setReceipt({ ...receipt, [key]: value });
  };

  const updateItem = (index: number, key: string, value: any) => {
    const newItems = [...receipt.items];
    newItems[index][key] = value;
    setReceipt({ ...receipt, items: newItems });
  };

  const sectionStyle = {
    marginBottom: "20px"
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "6px"
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>

      {/* Title */}
      <h2 style={{ marginBottom: "20px" }}>Edit Receipt</h2>

      {/* Merchant */}
      <div style={sectionStyle}>
        <label>Merchant</label>
        <input
          style={{
            ...inputStyle,
            border: !receipt.merchant ? "1px solid red" : "1px solid #ccc"
          }}
          value={receipt.merchant || ""}
          onChange={(e) => updateField("merchant", e.target.value)}
        />
      </div>

      {/* Date */}
      <div style={sectionStyle}>
        <label>Date</label>
        <input
          style={inputStyle}
          value={receipt.date || ""}
          onChange={(e) => updateField("date", e.target.value)}
        />
      </div>

      {/* Items */}
      <div style={sectionStyle}>
        <h3>Items</h3>

        {/* Header */}
        <div style={{ display: "flex", gap: "10px", fontWeight: "bold" }}>
          <span style={{ width: "60px" }}>Qty</span>
          <span style={{ flex: 1 }}>Item</span>
          <span style={{ width: "80px" }}>Price</span>
        </div>

        {/* Items List */}
        {receipt.items?.map((item: any, i: number) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "8px"
            }}
          >
            {/* Quantity */}
            <input
              type="number"
              style={{ width: "60px", padding: "6px" }}
              value={item.quantity || 1}
              onChange={(e) =>
                updateItem(i, "quantity", Number(e.target.value))
              }
            />

            {/* Name */}
            <input
              style={{
                flex: 1,
                padding: "6px",
                border: !item.name ? "1px solid red" : "1px solid #ccc"
              }}
              value={item.name || ""}
              onChange={(e) =>
                updateItem(i, "name", e.target.value)
              }
            />

            {/* Amount */}
            <input
              type="number"
              style={{ width: "80px", padding: "6px" }}
              value={item.amount || 0}
              onChange={(e) =>
                updateItem(i, "amount", Number(e.target.value))
              }
            />
          </div>
        ))}
      </div>

      {/* Total */}
      <div style={sectionStyle}>
        <label>Total</label>
        <input
          style={{ ...inputStyle, fontWeight: "bold" }}
          value={receipt.total || ""}
          onChange={(e) => updateField("total", e.target.value)}
        />
      </div>

      {/* Save */}
      <button
  className="button"
  onClick={async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/receipt/save",
        receipt
      );

      alert("Saved successfully!");
    } catch (err) {
      alert("Save failed");
    }
  }}
>
  Save Receipt
</button>
    </div>
  );
}