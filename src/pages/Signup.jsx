import { Lock, Mail, ShieldCheck, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

export default function Signup() {
  const navigate = useNavigate();
  const { signup } = useApp();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const submit = (event) => {
    event.preventDefault();
    if (form.name.trim().length < 2) return setError("Name is required.");
    if (!/\S+@\S+\.\S+/.test(form.email)) return setError("Enter a valid email.");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");
    const result = signup(form.name, form.email, form.password);
    if (!result.ok) return setError(result.error);
    navigate("/");
  };

  const update = (field, value) => setForm((current) => ({ ...current, [field]: value }));

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
            <p className="text-sm text-slate-400">Create analyst profile</p>
          </div>
        </div>
        <Input icon={User} label="Full name" value={form.name} onChange={(value) => update("name", value)} />
        <Input icon={Mail} label="Email" value={form.email} onChange={(value) => update("email", value)} />
        <Input icon={Lock} label="Password" type="password" value={form.password} onChange={(value) => update("password", value)} />
        {error && <p className="mb-4 text-sm text-red-300">{error}</p>}
        <button className="btn-primary w-full">Create account</button>
        <p className="mt-6 text-center text-sm text-slate-400">
          Already registered? <Link className="font-bold text-teal-300" to="/login">Login</Link>
        </p>
      </form>
    </main>
  );
}

function Input({ icon: Icon, label, value, onChange, type = "text" }) {
  return (
    <label className="mb-4 block">
      <span className="mb-2 flex items-center gap-2 text-sm text-slate-300"><Icon size={16} /> {label}</span>
      <input className="field" type={type} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}
