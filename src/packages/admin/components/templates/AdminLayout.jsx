"use client";
export function AdminLayout({ title, formId, buttonLabel = "Save", children }) {
  const hasHeader = !!title || !!formId;
  return (
    <div className="flex h-full flex-col">
      {hasHeader && (
        <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-gray-200 bg-gray-50/80 px-6 py-4 backdrop-blur">
          <div className="flex min-w-0 flex-1 items-center">
            <h1 className="truncate text-lg font-semibold text-gray-900">{title}</h1>
          </div>
          {formId && (
            <button
              type="submit"
              form={formId}
              className="shrink-0 rounded-lg bg-gray-900 px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800"
            >
              {buttonLabel}
            </button>
          )}
        </header>
      )}
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
}
