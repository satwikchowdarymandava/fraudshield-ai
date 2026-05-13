export default function LoadingSpinner({ label = "Analyzing" }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950/20 border-t-slate-950" />
      {label}
    </span>
  );
}
