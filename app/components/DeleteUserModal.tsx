"use client";

import { Trash2, X } from "lucide-react";

import type { User } from "../../types/user";

type DeleteUserModalProps = {
  isOpen: boolean;
  user: User | null;
  onClose: () => void;
  onConfirm: (userId: number) => void;
};

export default function DeleteUserModal({
  isOpen,
  user,
  onClose,
  onConfirm,
}: DeleteUserModalProps) {
  if (!isOpen || !user) {
    return null;
  }

  function handleDelete() {
    if (!user) {
      return;
    }

    onConfirm(user.id);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white shadow-xl">
        <div className="flex items-start justify-between p-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600">
            <Trash2 size={20} />
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 pb-6">
          <h2 className="text-lg font-semibold text-zinc-900">
            Delete user?
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-500">
            Are you sure you want to delete{" "}
            <span className="font-medium text-zinc-900">
              {user.name}
            </span>
            ? This action cannot be undone.
          </p>
        </div>

        <div className="flex justify-end gap-3 border-t border-zinc-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-zinc-200 px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Delete user
          </button>
        </div>
      </div>
    </div>
  );
}