import { MailCheck, Radar, ShieldAlert } from "lucide-react";
import GlassCard from "../components/GlassCard.jsx";
import PageTransition from "../components/PageTransition.jsx";
import PredictionForm from "../components/PredictionForm.jsx";
import ResultAlert from "../components/ResultAlert.jsx";
import { useApp } from "../context/AppContext.jsx";

export default function Scan() {
  const { user, prediction } = useApp();

  return (
    <PageTransition className="space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase text-teal-200">Transaction Scan</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Run a fraud prediction</h1>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_.85fr]">
        <GlassCard>
          <div className="mb-5 flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-400 text-slate-950 shadow-glow">
              <Radar size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Transaction Input</h2>
              <p className="text-sm text-slate-400">Fraud alerts will appear in-app and email the connected account.</p>
            </div>
          </div>
          <PredictionForm />
        </GlassCard>

        <div className="space-y-6">
          <GlassCard>
            <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-white">
              <ShieldAlert size={22} className="text-red-200" />
              Detection Result
            </h2>
            <ResultAlert />
          </GlassCard>

          <GlassCard>
            <h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-white">
              <MailCheck size={22} className="text-teal-200" />
              Email Notification
            </h2>
            <p className="text-sm text-slate-400">
              Connected email: <span className="font-semibold text-teal-200">{user?.email}</span>
            </p>
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.08] p-4 text-sm text-slate-300">
              {prediction?.status === "Fraud"
                ? "A fraud alert email is sent when a transaction is flagged."
                : "Safe results stay in the dashboard without sending a fraud email."}
            </div>
          </GlassCard>
        </div>
      </div>
    </PageTransition>
  );
}
