"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

import type {
  User,
  UserPlan,
  UserStatus,
} from "../../types/user";

type EditUserModalProps = {
  isOpen: boolean;
  user: User | null;
  onClose: () => void;
  onSave: (user: User) => void;
};

export default function EditUserModal({
  isOpen,
  user,
  onClose,
  onSave,
}: EditUserModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState<UserPlan>("Free");
  const [status, setStatus] = useState<UserStatus>("Active");

  useEffect(() => {
    if (!user) {
      return;
    }

    setName(user.name);
    setEmail(user.email);
    setPlan(user.plan);
    setStatus(user.status);
  }, [user]);

  if (!isOpen || !user) {
    return null;
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!user) {
      return;
    }

    if (!name.trim() || !email.trim()) {
      return;
    }

    const updatedUser: User = {
      ...user,
      name: name.trim(),
      email: email.trim(),
      plan,
      status,
    };

    onSave(updatedUser);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">
              Edit user
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Update user information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5 p-6">
            <div>
              <label
                htmlFor="edit-name"
                className="mb-2 block text-sm font-medium text-zinc-700"
              >
                Name
              </label>

              <input
                id="edit-name"
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                className="w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-zinc-400"
              />
            </div>

            <div>
              <label
                htmlFor="edit-email"
                className="mb-2 block text-sm font-medium text-zinc-700"
              >
                Email
              </label>

              <input
                id="edit-email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                className="w-full rounded-lg border border-zinc-200 px-3 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-zinc-400"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="edit-plan"
                  className="mb-2 block text-sm font-medium text-zinc-700"
                >
                  Plan
                </label>

                <select
                  id="edit-plan"
                  value={plan}
                  onChange={(event) =>
                    setPlan(
                      event.target.value as UserPlan
                    )
                  }
                  className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-zinc-400"
                >
                  <option value="Free">Free</option>
                  <option value="Pro">Pro</option>
                  <option value="Business">
                    Business
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="edit-status"
                  className="mb-2 block text-sm font-medium text-zinc-700"
                >
                  Status
                </label>

                <select
                  id="edit-status"
                  value={status}
                  onChange={(event) =>
                    setStatus(
                      event.target.value as UserStatus
                    )
                  }
                  className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-zinc-400"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">
                    Inactive
                  </option>
                  <option value="Blocked">
                    Blocked
                  </option>
                </select>
              </div>
            </div>
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
              type="submit"
              className="rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}