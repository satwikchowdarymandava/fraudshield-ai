import { Lock, Mail, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (event) => {
    event.preventDefault();
    if (!/\S+@\S+\.\S+/.test(email)) return setError("Enter a valid email.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    const result = login(email, password);
    if (!result.ok) return setError(result.error);
    navigate("/");
  };

  return (
    <main className="grid min-h-screen place-items-center bg-cyber px-4 py-10 text-white">
      <form
        className="glass w-full max-w-md animate-[fadeIn_.35s_ease-out] rounded-3xl p-7 shadow-2xl shadow-slate-950/30"
        onSubmit={submit}
      >
        <div className="mb-8 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-teal-400 text-slate-950 shadow-glow">
            <ShieldCheck size={26} />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold">FraudShield AI</h1>
            <p className="text-sm text-slate-400">Secure analyst access</p>
          </div>
        </div>
        <label className="mb-4 block">
          <span className="mb-2 flex items-center gap-2 text-sm text-slate-300"><Mail size={16} /> Email</span>
          <input className="field" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        </label>
        <label className="mb-4 block">
          <span className="mb-2 flex items-center gap-2 text-sm text-slate-300"><Lock size={16} /> Password</span>
          <input className="field" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" />
        </label>
        {error && <p className="mb-4 text-sm text-red-300">{error}</p>}
        <button className="btn-primary w-full">Login</button>
        <p className="mt-6 text-center text-sm text-slate-400">
          New workspace? <Link className="font-bold text-teal-300" to="/signup">Create account</Link>
        </p>
      </form>
    </main>
  );
}
