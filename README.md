# Receipt Parser

## Setup

### Backend
- cd backend
- npm install
- cp .env.example .env
- add your GEMINI_API_KEY
- npm run dev

### Frontend
- cd frontend
- npm install
- npm start

## What did you build?

I built a full-stack web application that allows users to upload a receipt image and extract structured data including merchant name, date, line items, and total using an LLM. The extracted data is presented in an editable UI where users can correct inaccuracies before saving. The corrected receipts are persisted in a JSON file on the backend.

---

## What are the biggest tradeoffs you made, and why?

1. JSON file instead of database
I chose a JSON file for persistence instead of a database like SQLite to keep the implementation simple and within the time constraints. This allowed me to focus more on the core product flow and UX.

2. Normalization layer for LLM output
LLM responses were inconsistent (e.g., description vs name, price vs amount). I introduced a normalization layer instead of enforcing strict prompt engineering. This improves robustness and keeps the UI stable.

3. Simple UI over design-heavy approach
I avoided spending excessive time on styling frameworks and focused on clarity and usability of the correction flow, since that is the most critical part of the product.

---

## Where did you use an LLM, and for what?

I used an LLM (Gemini) for extracting structured data from receipt images. Specifically:

- Sent the uploaded image (base64 encoded) to the LLM
- Prompted it to return structured JSON
- Parsed and normalized the response before sending it to the frontend

Additionally, I used LLMs for:

- Iterating on prompt design
- Debugging API responses
- Structuring the data extraction logic

---

## What would you do with another week?

1. Confidence-based highlighting
Highlight fields with low confidence or missing values to guide user corrections.

2. Better receipt parsing
Handle taxes, discounts, subtotals, and multi-line items more accurately.

3. Persistence improvements
Move from JSON file to a proper database (SQLite/PostgreSQL) and add a UI to view saved receipts.

4. Error handling & retries
Retry LLM calls on failure and handle malformed responses more gracefully.

5. Improved UX

- Drag & drop upload
- Loading states
- Inline validation
- Add/remove items dynamically

---

## What’s one thing in this spec you'd push back on if I were your PM?

The definition of “line items” is underspecified. Receipts vary widely and include taxes, discounts, service charges, and tips, which are not always clearly distinguishable from actual items.

I would push for clearer product requirements on:

Whether taxes and fees should be treated as line items
Whether totals should be recomputed or trusted from the receipt

Without this clarity, both extraction logic and user expectations can become inconsistent.

---

## What happens when the LLM returns malformed output?

I implemented a defensive parsing layer:

- Cleaned markdown formatting (e.g., ```json blocks)
- Attempted JSON parsing
- If parsing fails → return a structured error object

`{
  "error": "Parsing failed",
  "raw": "LLM response"
}`

On the UI side, the user can still proceed and manually correct values.

**Why?**

1. Retrying blindly can increase latency and cost
2. Failing silently is dangerous
3. Giving control to the user keeps the system usable even when LLM output is imperfect

## APP UI Response

<img width="691" height="797" alt="receipt-parser" src="https://github.com/user-attachments/assets/51196fb8-791e-4ffd-990f-42c4914c6e46" />
