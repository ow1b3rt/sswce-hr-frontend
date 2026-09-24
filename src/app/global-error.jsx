'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error('Global runtime error:', error);
  }, [error]);

  return (
    <main className="bg-background relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-12">
      <div
        aria-hidden="true"
        className="bg-primary-red/5 absolute top-1/2 left-1/2 h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
      />

      <div className="relative z-10 w-full max-w-xl text-center">
        <div className="border-border bg-card mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl border shadow-sm">
          <AlertTriangle className="text-primary-red h-9 w-9" />
        </div>

        <p className="text-primary-red mb-3 text-sm font-semibold tracking-[0.2em] uppercase">
          Unexpected error
        </p>

        <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Something went wrong
        </h1>

        <p className="text-muted-foreground mx-auto mt-5 max-w-lg text-sm leading-7 sm:text-base">
          We encountered an unexpected problem while loading this page. Please
          try again.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => reset()}
            className="bg-primary-red hover:bg-primary inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-colors sm:min-w-36"
          >
            <RefreshCcw className="h-4 w-4" />
            Try Again
          </button>
        </div>

        <p className="text-muted-foreground mt-10 text-sm">
          If this keeps happening, please try refreshing the page or come back
          later.
        </p>
      </div>
    </main>
  );
}
