import GlassCard from "../components/GlassCard.jsx";
import PageTransition from "../components/PageTransition.jsx";
import TransactionTable from "../components/TransactionTable.jsx";
import { useApp } from "../context/AppContext.jsx";

export default function History() {
  const { transactions, loadingTransactions } = useApp();

  return (
    <PageTransition className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase text-teal-200">Transaction History</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Audit every payment signal</h1>
      </div>
      <GlassCard>
        {loadingTransactions ? <div className="py-16 text-center text-slate-400">Loading transactions...</div> : <TransactionTable transactions={transactions} />}
      </GlassCard>
    </PageTransition>
  );
}
