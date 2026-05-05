import { useState } from "react";
import Upload from "./components/Upload";
import Editor from "./components/Editor";

function App() {
  const [data, setData] = useState(null);

  return (
    <div className="container">
  <h1 className="title">🧾 Receipt Parser</h1>

  <div className="card">
    <Upload setData={setData} />
  </div>

  {data && (
    <div className="card">
      <Editor data={data} />
    </div>
  )}
</div>
  );
}

export default App;