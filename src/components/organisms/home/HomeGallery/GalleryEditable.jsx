"use client";

import { useRef, useState } from "react";
import { MediaLibraryModal, resolveUrl, setPath, useToast } from "@/packages/admin";
import { FaGripVertical, FaPlus, FaTrash } from "react-icons/fa";

import { ImageContainer } from "@/components/molecules/ImageContainer";

const THEMES = {
  lightblue: "bg-primary-blue-dark/10 text-primary-blue-dark",
  darkblue: "bg-primary-blue-dark text-white",
};

function GalleryCardEditable({
  item,
  path,
  onChange,
  onImageClick,
  onRemove,
  dropProps,
  dragHandleProps,
}) {
  const cardRef = useRef(null);
  const theme = item.theme ?? "lightblue";

  return (
    <div
      ref={cardRef}
      onDragOver={dropProps.onDragOver}
      onDrop={dropProps.onDrop}
      className="relative flex w-full flex-col gap-3 rounded-2xl border border-gray-200 p-3 shadow-sm"
    >
      <div className="absolute top-2 left-2 z-10 flex items-center gap-1">
        <span
          className="cursor-move rounded bg-white/80 p-2 text-black/50 shadow"
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setDragImage(cardRef.current, 20, 20);
            dragHandleProps.onDragStart(e);
          }}
        >
          <FaGripVertical size={20} />
        </span>
        <button
          type="button"
          onClick={onRemove}
          className="rounded bg-white/80 p-2 text-black/50 shadow hover:text-red-600"
        >
          <FaTrash size={20} />
        </button>
      </div>

      {item.image?.src ? (
        <ImageContainer
          className="aspect-square w-full flex-1 cursor-pointer rounded-xl"
          src={item.image.src}
          alt={item.image.alt}
          onClick={onImageClick}
        />
      ) : (
        <div
          className="flex aspect-square w-full flex-1 cursor-pointer items-center justify-center rounded-xl bg-gray-100 text-sm text-gray-400"
          onClick={onImageClick}
        >
          No image
        </div>
      )}

    </div>
  );
}

export const HomeGalleryEditable = ({ section: initialSection, onChange, onSave }) => {
  const [section, setSection] = useState(initialSection);
  const [mediaPath, setMediaPath] = useState(null);
  const [saving, setSaving] = useState(false);

  if (!section) return null;

  const update = (next) => {
    setSection(next);
    onChange?.(next);
  };

  const handleChange = (path) => (e) => {
    const value = e.target.value === "" ? null : e.target.value;
    update(setPath(section, path, value));
  };

  const handleImageSelect = (item) => {
    update(setPath(section, mediaPath, resolveUrl(item)));
    setMediaPath(null);
  };

  const addItem = () => {
    update({ ...section, items: [...section.items, { image: { src: "", alt: "" }, label: null }] });
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
    <div className="flex flex-col gap-6">
      <div className="grid max-h-190 grid-cols-1 gap-6 overflow-y-scroll md:grid-cols-2 lg:grid-cols-3">
        {section.items.map((item, i) => (
          <GalleryCardEditable
            key={i}
            item={item}
            path={`items.${i}`}
            onChange={handleChange}
            onImageClick={() => setMediaPath(`items.${i}.image.src`)}
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
      </div>

      <div className="sticky bottom-0 mb-10 p-4 bg-gray-50 flex items-center justify-between">
        <button
          type="button"
          onClick={addItem}
          className="flex w-fit items-center gap-2 rounded-full border border-dashed border-gray-400 px-4 py-2 text-sm font-bold text-black/60"
        >
          <FaPlus size={12} /> Add image
        </button>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="bg-primary-green-dark rounded-full px-6 py-2 text-sm font-bold text-white disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save Gallery"}
        </button>
      </div>

      {mediaPath && (
        <MediaLibraryModal
          name={mediaPath}
          onClose={() => setMediaPath(null)}
          onSelect={handleImageSelect}
        />
      )}
    </div>
  );
};
