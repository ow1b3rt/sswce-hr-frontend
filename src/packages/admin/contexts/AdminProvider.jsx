"use client";

import { AdminGate } from "../components/templates/AdminGate.jsx";
import { AdminShell } from "../components/templates/AdminShell.jsx";
import { getRuntimeConfig } from "../lib/runtime.config.js";
import { ApiProvider } from "./ApiContext.jsx";
import { AuthProvider } from "./AuthContext.jsx";
import { ToastProvider } from "./ToastContext.jsx";

export function AdminProvider({ children }) {
  const config = getRuntimeConfig();
  console.log(config)

  if (!config?.apiBaseUrl) {
    throw new Error(
      "[@lynx/admin-panel] Missing config. Make sure <AdminConfigInit config={adminConfig} /> " +
        "is mounted in your root layout before any admin routes render.",
    );
  }

  return (
    <ToastProvider>
      <ApiProvider baseUrl={config.apiBaseUrl}>
        <AuthProvider>
          <AdminGate>
            <AdminShell>{children}</AdminShell>
          </AdminGate>
        </AuthProvider>
      </ApiProvider>
    </ToastProvider>
  );
}
