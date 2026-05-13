import { ChevronLeft, ChevronRight, Download, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { exportTransactionsCsv } from "../utils/csv.js";
import { formatCurrency } from "../utils/format.js";

const PAGE_SIZE = 6;

export default function TransactionTable({ transactions }) {
  const rows = Array.isArray(transactions) ? transactions : [];
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const normalized = query.toLowerCase();
    return rows.filter((item) => {
      const matchesFilter = filter === "all" || item.status === filter;
      const matchesQuery = [item.id, item.merchant, item.location, item.status].join(" ").toLowerCase().includes(normalized);
      return matchesFilter && matchesQuery;
    });
  }, [rows, query, filter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const changeFilter = (next) => {
    setFilter(next);
    setPage(1);
  };

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3">
          <Search size={18} className="text-slate-400" />
          <input className="w-full bg-transparent text-sm text-white placeholder:text-slate-500" placeholder="Search history" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            ["all", "All"],
            ["Fraud", "Fraud"],
            ["Safe", "Non-Fraud"]
          ].map(([value, label]) => (
            <button
              key={value}
              className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                filter === value ? "bg-teal-400 text-slate-950" : "border border-white/10 bg-white/[0.08] text-slate-200 hover:bg-white/[0.14]"
              }`}
              onClick={() => changeFilter(value)}
            >
              {label}
            </button>
          ))}
          <button className="btn-ghost" onClick={() => exportTransactionsCsv(filtered)}>
            <Download size={17} />
            CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-separate border-spacing-y-2 text-left">
          <thead className="text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-2">Transaction ID</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">Merchant</th>
              <th className="px-4 py-2">Location</th>
            </tr>
          </thead>
          <tbody>
            {pageItems.map((item) => (
              <tr key={item.id} className="bg-white/[0.08] text-sm transition hover:bg-white/[0.14]">
                <td className="rounded-l-xl px-4 py-4 font-bold text-white">{item.id}</td>
                <td className="px-4 py-4 text-slate-200">{formatCurrency(item.amount)}</td>
                <td className="px-4 py-4">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${item.status === "Fraud" ? "bg-red-400/15 text-red-200" : "bg-emerald-400/15 text-emerald-200"}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-slate-300">{item.time}</td>
                <td className="px-4 py-4 text-slate-300">{item.merchant}</td>
                <td className="rounded-r-xl px-4 py-4 text-slate-300">{item.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 flex items-center justify-between text-sm text-slate-400">
        <span>
          Page {page} of {totalPages}
        </span>
        <div className="flex gap-2">
          <button className="rounded-xl border border-white/10 p-3 disabled:opacity-40" disabled={page === 1} onClick={() => setPage((value) => Math.max(1, value - 1))} aria-label="Previous page">
            <ChevronLeft size={18} />
          </button>
          <button className="rounded-xl border border-white/10 p-3 disabled:opacity-40" disabled={page === totalPages} onClick={() => setPage((value) => Math.min(totalPages, value + 1))} aria-label="Next page">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
