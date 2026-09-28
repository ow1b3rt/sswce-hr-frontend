"use client";

import { useState } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

function FaqItem({ number, question, answer, open, onToggle }) {
  return (
    <div
      className={`w-full rounded-lg border border-gray-200 shadow-sm ${
        open ? "bg-primary-green" : "bg-white"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full cursor-pointer items-center justify-between gap-4 rounded-lg px-8 py-3 text-left"
      >
        <span className={`text-5 ${open ? "text-white" : "text-black"}`}>
          {number}. {question}
        </span>
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
            open ? "text-primary-green bg-white" : "bg-primary-red text-white"
          }`}
        >
          <FaCaretUp
            size={18}
            className={`${open ? "rotate-0" : "rotate-180"} transform transition-transform duration-300`}
          />
        </span>
      </button>

      <div
        className={`grid bg-white transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <p className="p-6 text-lg text-black/70">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export function FaqSection({ section: data = section }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      {data.items.map((item, i) => (
        <FaqItem
          key={i}
          number={i + 1}
          question={item.question}
          answer={item.answer}
          open={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </div>
  );
}
