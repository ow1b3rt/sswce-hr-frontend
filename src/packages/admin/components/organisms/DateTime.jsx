"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export function DateTime({
  defaultValue,
  name = "publishedAt",
  label = "Publish date",
  required = false,
}) {
  const [publishedAt, setPublishedAt] = useState(defaultValue ? new Date(defaultValue) : null);

  return (
    <fieldset className="flex w-full flex-col gap-1.5">
      {label && (
        <legend className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </legend>
      )}
      <DatePicker
        selected={publishedAt}
        onChange={setPublishedAt}
        showTimeSelect
        dateFormat="MMM d, yyyy h:mm aa"
        isClearable
        placeholderText="Select date and time"
        className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none"
      />
      <input type="hidden" name={name} value={publishedAt ? publishedAt.toISOString() : ""} />
    </fieldset>
  );
}
