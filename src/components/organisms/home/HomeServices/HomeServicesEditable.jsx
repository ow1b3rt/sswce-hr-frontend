"use client";

import { useState } from "react";
import { MediaLibraryModal, resolveUrl, setPath } from "@/packages/admin";
import { slugify } from "@/packages/admin/utils/utils";
import { FaPlus, FaTrash } from "react-icons/fa";

import { ConfirmationDialog } from "@/components/molecules/ConfirmationModal";
import { ImageContainer } from "@/components/molecules/ImageContainer";

function ServiceCardEditable({ item, path, onChange, onImageClick, onRemove }) {
  return (
    <div className="relative flex w-full flex-col gap-4 rounded-2xl border border-gray-200 p-4 shadow-sm">
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-3 right-3 z-10 cursor-pointer rounded bg-white/90 p-2 text-black/50 shadow hover:text-red-600"
      >
        <FaTrash size={14} />
      </button>

      {item.image?.src ? (
        <ImageContainer
          className="aspect-video w-full cursor-pointer rounded-xl"
          src={item.image.src}
          alt={item.image.alt ?? item.title ?? ""}
          onClick={onImageClick}
        />
      ) : (
        <div
          className="flex aspect-video w-full cursor-pointer items-center justify-center rounded-xl bg-gray-100 text-sm text-gray-400"
          onClick={onImageClick}
        >
          No image
        </div>
      )}

      <input
        type="text"
        className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base font-bold"
        placeholder="Title"
        value={item.title ?? ""}
        onChange={onChange(`${path}.title`)}
      />

      <textarea
        rows={20}
        className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm"
        placeholder="Description"
        value={item.description ?? ""}
        onChange={onChange(`${path}.description`)}
      />
    </div>
  );
}

export const HomeServicesEditable = ({
  section: initialSection,
  onChange,
  onSave,
  sectionName = "services",
}) => {
  const [section, setSection] = useState(initialSection);
  const [mediaPath, setMediaPath] = useState(null);
  const [saving, setSaving] = useState(false);
  const [removeIndex, setRemoveIndex] = useState(null); // index pending removal, or null

  if (!section) return null;

  const update = (next) => {
    setSection(next);
    onChange?.(next);
  };

  const handleChange = (path) => (e) => {
    const value = e.target.value;

    if (path.endsWith(".title")) {
      const basePath = path.slice(0, -".title".length);

      let next = setPath(section, path, value);

      next = setPath(next, `${basePath}.slug`, slugify(value));

      update(next);
      return;
    }

    update(setPath(section, path, value));
  };

  const handleImageSelect = (item) => {
    update(
      setPath(section, mediaPath, {
        src: resolveUrl(item),
        alt: item.alt ?? "",
      }),
    );

    setMediaPath(null);
  };

  const addItem = () => {
    update({
      ...section,
      items: [
        ...(section.items ?? []),
        {
          image: {
            src: "",
            alt: "",
          },
          title: "",
          description: "",
        },
      ],
    });
  };

  const removeItem = (index) => {
    update({
      ...section,
      items: (section.items ?? []).filter((_, i) => i !== index),
    });
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      await onSave?.(section);
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmRemove = () => {
    if (removeIndex !== null) {
      removeItem(removeIndex);
    }
    setRemoveIndex(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid max-h-190 grid-cols-1 gap-6 overflow-y-scroll md:grid-cols-2 lg:grid-cols-2">
        {(section.items ?? []).map((item, i) => (
          <ServiceCardEditable
            key={i}
            item={item}
            path={`items.${i}`}
            onChange={handleChange}
            onImageClick={() => setMediaPath(`items.${i}.image`)}
            onRemove={() => setRemoveIndex(i)}
          />
        ))}
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={addItem}
          className="flex w-fit items-center gap-2 rounded-full border border-dashed border-gray-400 px-4 py-2 text-sm font-bold text-black/60"
        >
          <FaPlus size={12} />
          Add {sectionName}
        </button>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="bg-primary-green-dark rounded-full px-6 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {saving ? "Saving…" : `Save ${sectionName}`}
        </button>
      </div>

      {mediaPath && (
        <MediaLibraryModal
          name={mediaPath}
          onClose={() => setMediaPath(null)}
          onSelect={handleImageSelect}
        />
      )}

      <ConfirmationDialog
        open={removeIndex !== null}
        onOpenChange={(open) => {
          if (!open) setRemoveIndex(null);
        }}
        title={`Remove this ${sectionName.replace(/s$/, "")}?`}
        description="This item will be permanently removed. This action can't be undone."
        confirmLabel="Remove"
        variant="destructive"
        onConfirm={handleConfirmRemove}
      />
    </div>
  );
};
