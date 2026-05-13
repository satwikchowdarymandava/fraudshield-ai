import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, info: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    this.setState({ error, info });
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <main className="grid min-h-screen place-items-center bg-slate-950 px-4 text-white">
        <section className="max-w-lg rounded-2xl border border-red-400/30 bg-red-500/10 p-6 shadow-2xl">
          <h1 className="text-2xl font-extrabold text-red-100">FraudShield AI could not start</h1>
          <p className="mt-3 text-sm text-red-100/80">{this.state.error.message}</p>
          <pre className="mt-4 max-h-52 overflow-auto whitespace-pre-wrap rounded-xl bg-slate-950/70 p-3 text-xs text-red-100/80">
            {this.state.error.stack || this.state.info?.componentStack}
          </pre>
          <button className="mt-5 rounded-xl bg-red-300 px-4 py-3 text-sm font-bold text-red-950" onClick={() => window.location.reload()}>
            Reload app
          </button>
        </section>
      </main>
    );
  }
}
