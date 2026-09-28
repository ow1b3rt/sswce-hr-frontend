"use client";

import { useState } from "react";
import { AlertTriangle, RefreshCw, ServerOff, WifiOff } from "lucide-react";

export function ServerDownScreen({ onRetry }) {
  const [isRetrying, setIsRetrying] = useState(false);
  const [failedAttempt, setFailedAttempt] = useState(false);

  const handleRetry = async () => {
    setIsRetrying(true);
    setFailedAttempt(false);

    const reconnected = await onRetry();

    setIsRetrying(false);
    if (!reconnected) {
      setFailedAttempt(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex min-h-screen w-full flex-col items-center justify-center px-4 text-center text-slate-100">
      <div className="absolute top-1/2 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/10 blur-3xl" />

      <div className="mx-auto flex max-w-md flex-col items-center">
        <div className="bg-primary-blue relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-slate-800 shadow-xl">
          <ServerOff className="text-primary-red h-10 w-10" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="bg-primary-red absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
            <span className="bg-primary-red relative inline-flex h-4 w-4 rounded-full" />
          </span>
        </div>

        <h1 className="text-primary-red text-2xl font-bold tracking-tight sm:text-4xl">
          Service Unavailable
        </h1>
        <p className="text-text-color mt-3 text-lg leading-relaxed">
          We are unable to connect to the administration server. The service may be offline,
          undergoing maintenance, or experiencing network disruptions.
        </p>

        {failedAttempt && (
          <div className="bg-primary-red mt-4 flex items-center gap-2 rounded-lg border px-3 py-2 text-xs text-white">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span>Still unable to reach the server.</span>
          </div>
        )}

        <button
          type="button"
          onClick={handleRetry}
          disabled={isRetrying}
          className="bg-primary-green mt-8 flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl px-6 py-3 text-base font-semibold text-white transition duration-200 hover:bg-black active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw className={`h-4 w-4 ${isRetrying ? "animate-spin" : ""}`} />
          {isRetrying ? "Checking Connection…" : "Retry Connection"}
        </button>

        <div className="mt-8 flex items-center gap-2 text-base text-slate-500">
          <WifiOff className="h-3.5 w-3.5" />
          <span>Endpoint connection failed on initial boot.</span>
        </div>
      </div>
    </div>
  );
}
