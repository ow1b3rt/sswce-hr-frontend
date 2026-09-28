'use client';

import { useEffect, useState } from 'react';
import { useResolvedDefault } from '@/packages/admin/components/atoms/Input.jsx';
import { Plus, X } from 'lucide-react';

export const inputClass =
  'w-full rounded-sm border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none';

export function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {children}
    </div>
  );
}

// Editor for arrays of objects — the "seasons" lists.
// Entries render in a grid (2 cols / 3 on wide screens) instead of
// stacking full-width, since each card is short and mostly labels+short text.
export function ObjectListEditor({ items, onChange, fields, addLabel }) {
  const update = (i, key, val) =>
    onChange(items.map((it, idx) => (idx === i ? { ...it, [key]: val } : it)));
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));
  const add = () =>
    onChange([...items, Object.fromEntries(fields.map((f) => [f.key, '']))]);

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="flex flex-col gap-2 rounded-lg border border-gray-200 p-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold tracking-wide text-gray-400 uppercase">
              Entry {i + 1}
            </span>
            <button
              type="button"
              onClick={() => remove(i)}
              className="text-gray-400 hover:text-red-600"
              title="Remove"
            >
              <X size={14} />
            </button>
          </div>

          {fields.map((f) => (
            <Field key={f.key} label={f.label}>
              {f.type === 'textarea' ? (
                <textarea
                  className={`${inputClass} min-h-[70px]`}
                  value={item[f.key] ?? ''}
                  placeholder={f.placeholder}
                  onChange={(e) => update(i, f.key, e.target.value)}
                />
              ) : (
                <input
                  className={inputClass}
                  value={item[f.key] ?? ''}
                  placeholder={f.placeholder}
                  onChange={(e) => update(i, f.key, e.target.value)}
                />
              )}
            </Field>
          ))}
        </div>
      ))}

      <button
        type="button"
        onClick={add}
        className="col-span-full flex w-fit items-center gap-1 rounded-md border border-dashed border-gray-300 px-3 py-1.5 text-sm text-gray-500 hover:border-indigo-500 hover:text-indigo-500"
      >
        <Plus size={16} /> {addLabel}
      </button>
    </div>
  );
}

// Editor for arrays of plain strings — "items" / "requirements".
// Same grid treatment: each string is a single short line, no reason
// to give it the full row width.
export function StringListEditor({ items, onChange, placeholder, addLabel }) {
  const update = (i, val) =>
    onChange(items.map((it, idx) => (idx === i ? val : it)));
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));
  const add = () => onChange([...items, '']);

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            className={inputClass}
            value={item}
            placeholder={placeholder}
            onChange={(e) => update(i, e.target.value)}
          />
          <button
            type="button"
            onClick={() => remove(i)}
            className="shrink-0 text-gray-400 hover:text-red-600"
            title="Remove"
          >
            <X size={16} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="col-span-full flex w-fit items-center gap-1 rounded-md border border-dashed border-gray-300 px-3 py-1.5 text-sm text-gray-500 hover:border-indigo-500 hover:text-indigo-500"
      >
        <Plus size={16} /> {addLabel}
      </button>
    </div>
  );
}
