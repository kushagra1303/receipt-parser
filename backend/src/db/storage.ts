import fs from "fs";

const FILE = "db.json";

export function saveReceipt(data: any) {
  let existing = [];

  if (fs.existsSync(FILE)) {
    const content = fs.readFileSync(FILE, "utf-8");
    existing = content ? JSON.parse(content) : [];
  }

  existing.push({
    id: Date.now(),
    ...data
  });

  fs.writeFileSync(FILE, JSON.stringify(existing, null, 2));
}