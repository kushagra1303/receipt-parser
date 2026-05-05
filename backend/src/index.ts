import express from "express";
import cors from "cors";
import receiptRoutes from "./routes/receipt";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/receipt", receiptRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});