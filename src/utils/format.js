export function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value || 0);
}

export function maskCardNumber(value) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
}

export function getMetrics(transactions) {
  const list = Array.isArray(transactions) ? transactions : [];
  const total = list.length;
  const fraud = list.filter((item) => item.status === "Fraud").length;
  const safe = total - fraud;
  const rate = total ? ((fraud / total) * 100).toFixed(1) : "0.0";
  return { total, fraud, safe, rate };
}
