"use client";

import { useRef, useState } from "react";
import { setPath } from "@/packages/admin";
import { FaCaretUp, FaGripVertical, FaPlus, FaTrash } from "react-icons/fa";

function FaqItemEditable({
  number,
  item,
  path,
  onChange,
  open,
  onToggle,
  onRemove,
  dropProps,
  dragHandleProps,
}) {
  const rowRef = useRef(null);
  const headerRef = useRef(null);

  return (
    <div
      ref={rowRef}
      onDragOver={dropProps.onDragOver}
      onDrop={dropProps.onDrop}
      className={`w-full rounded-lg border border-gray-200 shadow-sm ${open ? "bg-primary-green" : "bg-white"}`}
    >
      <div ref={headerRef} className="flex w-full items-center gap-4 px-4 py-3">
        <span
          className="cursor-move text-black/30"
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setDragImage(headerRef.current, 20, 20);
            dragHandleProps.onDragStart(e);
          }}
        >
          <FaGripVertical size={16} />
        </span>
        <button type="button" onClick={onToggle} className="cursor-pointer text-lg font-bold">
          {number}.
        </button>
        <input
          className={`flex-1 bg-transparent text-lg ${open ? "text-white" : "text-black"}`}
          value={item.question}
          onChange={onChange(`${path}.question`)}
        />
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
            open ? "text-primary-green bg-white" : "bg-primary-red text-white"
          }`}
          onClick={onToggle}
        >
          <FaCaretUp
            size={18}
            className={`transform cursor-pointer transition-transform duration-300 ${open ? "rotate-0" : "rotate-180"}`}
          />
        </span>
        <button type="button" onClick={onRemove} className="text-black/40 hover:text-red-600">
          <FaTrash size={16} />
        </button>
      </div>

      <div
        className={`grid bg-white transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <textarea
            className="w-full p-6 text-lg text-black/70"
            value={item.answer}
            onChange={onChange(`${path}.answer`)}
          />
        </div>
      </div>
    </div>
  );
}

export const FaqEditable = ({ section: initialSection, onChange, onSave }) => {
  const [section, setSection] = useState(initialSection);
  const [openIndex, setOpenIndex] = useState(0);
  const [saving, setSaving] = useState(false);

  if (!section) return null;

  const update = (next) => {
    setSection(next);
    onChange?.(next);
  };

  const handleChange = (path) => (e) => {
    update(setPath(section, path, e.target.value));
  };

  const addItem = () => {
    update({ ...section, items: [...section.items, { question: "", answer: "" }] });
  };

  const removeItem = (i) => {
    update({ ...section, items: section.items.filter((_, idx) => idx !== i) });
  };

  const reorder = (from, to) => {
    const items = [...section.items];
    const [moved] = items.splice(from, 1);
    items.splice(to, 0, moved);
    update({ ...section, items });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave?.(section);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {section.items.map((item, i) => (
        <FaqItemEditable
          key={i}
          number={i + 1}
          item={item}
          path={`items.${i}`}
          onChange={handleChange}
          open={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
          onRemove={() => removeItem(i)}
          dragHandleProps={{
            onDragStart: (e) => e.dataTransfer.setData("text/plain", String(i)),
          }}
          dropProps={{
            onDragOver: (e) => e.preventDefault(),
            onDrop: (e) => {
              e.preventDefault();
              const from = Number(e.dataTransfer.getData("text/plain"));
              if (from !== i) reorder(from, i);
            },
          }}
        />
      ))}

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={addItem}
          className="flex w-fit items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-2 text-sm font-bold text-black/60"
        >
          <FaPlus size={12} /> Add question
        </button>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="btn btn-primary cursor-pointer rounded-lg bg-black px-6 py-2 font-bold text-white hover:bg-black/80 disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save FAQs"}
        </button>
      </div>
    </div>
  );
};
