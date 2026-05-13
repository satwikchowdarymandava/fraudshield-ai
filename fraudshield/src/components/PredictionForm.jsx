import { CreditCard, MapPin, Store, Timer, WalletCards } from "lucide-react";
import { useState } from "react";
import { useApp } from "../context/AppContext.jsx";
import { maskCardNumber } from "../utils/format.js";
import LoadingSpinner from "./LoadingSpinner.jsx";

const initial = { cardNumber: "", amount: "", location: "", time: "", merchant: "" };

export default function PredictionForm() {
  const { submitPrediction } = useApp();
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const update = (field, value) => {
    setForm((current) => ({ ...current, [field]: field === "cardNumber" ? maskCardNumber(value) : value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const submit = async (event) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;
    setLoading(true);
    setApiError("");
    try {
      await submitPrediction(form);
      setForm(initial);
    } catch {
      setApiError("Prediction failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={submit}>
      <Field icon={CreditCard} error={errors.cardNumber}>
        <input className="field" placeholder="Card number" value={form.cardNumber} onChange={(e) => update("cardNumber", e.target.value)} inputMode="numeric" />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field icon={WalletCards} error={errors.amount}>
          <input className="field" placeholder="Transaction amount" value={form.amount} onChange={(e) => update("amount", e.target.value)} inputMode="decimal" />
        </Field>
        <Field icon={Timer} error={errors.time}>
          <input className="field" type="time" value={form.time} onChange={(e) => update("time", e.target.value)} />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field icon={MapPin} error={errors.location}>
          <input className="field" placeholder="Location" value={form.location} onChange={(e) => update("location", e.target.value)} />
        </Field>
        <Field icon={Store} error={errors.merchant}>
          <input className="field" placeholder="Merchant name" value={form.merchant} onChange={(e) => update("merchant", e.target.value)} />
        </Field>
      </div>
      {apiError && <p className="text-sm text-red-300">{apiError}</p>}
      <button className="btn-primary w-full" disabled={loading}>
        {loading ? <LoadingSpinner /> : "Run fraud scan"}
      </button>
    </form>
  );
}

function Field({ icon: Icon, error, children }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase text-slate-400">
        <Icon size={15} />
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-300">{error}</span>}
    </label>
  );
}

function validate(form) {
  const errors = {};
  if (form.cardNumber.replace(/\s/g, "").length < 12) errors.cardNumber = "Enter a valid card number.";
  if (!form.amount || Number(form.amount) <= 0) errors.amount = "Amount must be greater than zero.";
  if (!form.location.trim()) errors.location = "Location is required.";
  if (!form.time) errors.time = "Time is required.";
  if (!form.merchant.trim()) errors.merchant = "Merchant is required.";
  return errors;
}
