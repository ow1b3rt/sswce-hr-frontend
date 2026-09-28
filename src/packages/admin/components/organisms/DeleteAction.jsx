"use client";

import { useState } from "react";

import { ConfirmationDialog } from "@/components/molecules/ConfirmationModal";

import { useApi } from "../../contexts/ApiContext";
import { DeleteButton } from "../atoms/Buttons";

export function DeleteAction({ route, mutate }) {
  const { del } = useApi();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await del(`${route}`, { success: () => mutate?.() });
    } finally {
      setIsDeleting(false);
      setConfirmOpen(false);
    }
  };

  return (
    <>
      <DeleteButton onClick={() => setConfirmOpen(true)} />

      <ConfirmationDialog
        open={confirmOpen}
        onOpenChange={(open) => {
          if (!open) setConfirmOpen(false);
        }}
        title="Delete this record?"
        description="This action can't be undone."
        confirmLabel={isDeleting ? "Deleting…" : "Delete"}
        variant="destructive"
        onConfirm={handleDelete}
      />
    </>
  );
}
