import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import FraudToasts from "./FraudToasts.jsx";
import Sidebar from "./Sidebar.jsx";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cyber text-slate-100 dark:bg-cyber">
      <div className="flex min-h-screen">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className="min-w-0 flex-1">
          <Header setSidebarOpen={setSidebarOpen} />
          <FraudToasts />
          <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
