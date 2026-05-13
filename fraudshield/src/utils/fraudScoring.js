export function analyzeDatasetRows(rows) {
  return rows.map((row, index) => {
    const amount = readAmount(row);
    const declaredStatus = readValue(row, ["status", "risk", "class", "label", "is_fraud", "fraud"]);
    const probability = readProbability(row);
    const location = readValue(row, ["location", "city", "country"]);
    const merchant = readValue(row, ["merchant", "merchant_name", "vendor"]);
    const time = readValue(row, ["time", "transaction_time", "timestamp", "date"]) || "Unknown";
    const id = readValue(row, ["transaction_id", "id", "txn_id", "transactionid"]) || `ROW-${row.rowNumber || index + 1}`;

    const normalizedStatus = String(declaredStatus).trim().toLowerCase();
    const hasLabel = normalizedStatus !== "";
    const fraudByLabel = ["fraud", "fraudulent", "1", "true", "yes", "high"].includes(normalizedStatus);
    const heuristicScore = scoreRow({ amount, merchant, location, time });
    const score = Math.max(probability ?? 0, heuristicScore, fraudByLabel ? 0.86 : 0);
    const status = hasLabel ? (fraudByLabel ? "Fraud" : "Safe") : score >= 0.58 ? "Fraud" : "Safe";

    return {
      id,
      amount,
      merchant: merchant || "Unknown merchant",
      location: location || "Unknown",
      time,
      status,
      probability: Number(score.toFixed(2)),
      rowNumber: row.rowNumber,
      raw: row
    };
  });
}

function scoreRow({ amount, merchant, location, time }) {
  let score = 0.08;
  if (amount > 5000) score += 0.4;
  else if (amount > 2000) score += 0.24;
  else if (amount > 1000) score += 0.12;

  if (/lux|vault|crypto|wire|gift|casino/i.test(merchant)) score += 0.2;
  if (/dubai|berlin|toronto|singapore|unknown/i.test(location)) score += 0.14;
  if (/^(0[0-5]|23):/.test(time)) score += 0.14;
  return Math.min(0.96, score);
}

function readAmount(row) {
  const value = readValue(row, ["amount", "transaction_amount", "amt", "price", "value"]);
  return Number(String(value).replace(/[^0-9.-]/g, "")) || 0;
}

function readProbability(row) {
  const value = readValue(row, ["probability", "score", "risk_score", "fraud_probability"]);
  if (value === "") return null;
  const number = Number(value);
  if (Number.isNaN(number)) return null;
  return number > 1 ? number / 100 : number;
}

function readValue(row, keys) {
  for (const key of keys) {
    if (row[key] !== undefined && row[key] !== null && row[key] !== "") return row[key];
  }
  return "";
}
