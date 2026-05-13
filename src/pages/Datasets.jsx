import { Download, FileSearch, UploadCloud } from "lucide-react";
import { useMemo, useState } from "react";
import GlassCard from "../components/GlassCard.jsx";
import PageTransition from "../components/PageTransition.jsx";
import { useApp } from "../context/AppContext.jsx";
import { exportCsv, parseCsv } from "../utils/csv.js";
import { analyzeDatasetRows } from "../utils/fraudScoring.js";
import { formatCurrency } from "../utils/format.js";

export default function Datasets() {
  const { addDatasetTransactions } = useApp();
  const [fileName, setFileName] = useState("");
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  const fraudRows = useMemo(() => rows.filter((item) => item.status === "Fraud"), [rows]);
  const filteredFraud = useMemo(() => {
    const search = query.toLowerCase();
    return fraudRows.filter((item) => [item.id, item.merchant, item.location, item.time].join(" ").toLowerCase().includes(search));
  }, [fraudRows, query]);

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setError("");
    setFileName(file.name);

    try {
      const text = await file.text();
      const parsed = parseCsv(text);
      if (!parsed.length) {
        setRows([]);
        setError("Upload a CSV with a header row and at least one transaction row.");
        return;
      }
      const analyzed = analyzeDatasetRows(parsed);
      setRows(analyzed);
      addDatasetTransactions(analyzed);
    } catch {
      setRows([]);
      setError("Could not read this dataset. Please upload a valid CSV file.");
    }
  };

  const exportFraud = () => {
    exportCsv(
      "fraudshield-fraud-transactions.csv",
      ["Transaction ID", "Amount", "Merchant", "Location", "Time", "Probability", "Dataset Row"],
      filteredFraud.map((item) => [item.id, item.amount, item.merchant, item.location, item.time, item.probability, item.rowNumber])
    );
  };

  return (
    <PageTransition className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase text-teal-200">Dataset Upload</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Find fraud transactions in CSV data</h1>
      </div>

      <div className="grid gap-6 xl:grid-cols-[.8fr_1.2fr]">
        <GlassCard>
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-400 text-slate-950 shadow-glow">
              <UploadCloud size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Upload Dataset</h2>
              <p className="text-sm text-slate-400">CSV columns can include amount, merchant, location, time, status, score, or probability.</p>
            </div>
          </div>

          <label className="grid cursor-pointer place-items-center rounded-2xl border border-dashed border-teal-300/30 bg-teal-400/10 px-6 py-12 text-center transition hover:bg-teal-400/15">
            <FileSearch size={36} className="mb-3 text-teal-200" />
            <span className="font-bold text-white">Choose CSV dataset</span>
            <span className="mt-1 text-sm text-slate-400">{fileName || "No file selected"}</span>
            <input className="hidden" type="file" accept=".csv,text/csv" onChange={handleFile} />
          </label>

          {error && <p className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-100">{error}</p>}

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <Metric label="Rows scanned" value={rows.length} />
            <Metric label="Fraud found" value={fraudRows.length} danger />
            <Metric label="Safe rows" value={Math.max(0, rows.length - fraudRows.length)} />
          </div>
        </GlassCard>

        <GlassCard>
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Fraud Transactions</h2>
              <p className="text-sm text-slate-400">Only suspicious rows are listed here.</p>
            </div>
            <button className="btn-ghost disabled:cursor-not-allowed disabled:opacity-45" onClick={exportFraud} disabled={!filteredFraud.length}>
              <Download size={17} />
              Export
            </button>
          </div>

          <input className="field mb-4" placeholder="Search fraud rows" value={query} onChange={(event) => setQuery(event.target.value)} />

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-separate border-spacing-y-2 text-left">
              <thead className="text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-2">Transaction ID</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Merchant</th>
                  <th className="px-4 py-2">Location</th>
                  <th className="px-4 py-2">Time</th>
                  <th className="px-4 py-2">Risk</th>
                </tr>
              </thead>
              <tbody>
                {filteredFraud.map((item) => (
                  <tr key={`${item.id}-${item.rowNumber}`} className="bg-red-500/10 text-sm transition hover:bg-red-500/15">
                    <td className="rounded-l-xl px-4 py-4 font-bold text-white">{item.id}</td>
                    <td className="px-4 py-4 text-slate-200">{formatCurrency(item.amount)}</td>
                    <td className="px-4 py-4 text-slate-300">{item.merchant}</td>
                    <td className="px-4 py-4 text-slate-300">{item.location}</td>
                    <td className="px-4 py-4 text-slate-300">{item.time}</td>
                    <td className="rounded-r-xl px-4 py-4 text-red-200">{Math.round(item.probability * 100)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!filteredFraud.length && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-8 text-center text-sm text-slate-400">
              Upload a dataset to reveal fraud transactions.
            </div>
          )}
        </GlassCard>
      </div>
    </PageTransition>
  );
}

function Metric({ label, value, danger = false }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.08] p-4">
      <p className="text-xs text-slate-400">{label}</p>
      <p className={`mt-2 text-2xl font-extrabold ${danger ? "text-red-200" : "text-white"}`}>{value}</p>
    </div>
  );
}
