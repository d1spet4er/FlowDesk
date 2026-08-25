"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Building2,
  CheckCircle2,
  Loader2,
  Mail,
  Save,
  User,
} from "lucide-react";

import type {
  AdminSettings,
} from "../../../types/settings";

export default function SettingsPage() {
  const [settings, setSettings] =
    useState<AdminSettings>({
      name: "",
      email: "",
      timezone: "UTC",
      companyName: "",
    });

  const [isLoading, setIsLoading] =
    useState(true);

  const [isSaving, setIsSaving] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const [success, setSuccess] =
    useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          "/api/settings"
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load settings"
          );
        }

        const data =
          (await response.json()) as AdminSettings;

        setSettings(data);
      } catch {
        setError(
          "Could not load settings."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadSettings();
  }, []);

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    try {
      setIsSaving(true);
      setError(null);
      setSuccess(false);

      const response = await fetch(
        "/api/settings",
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(settings),
        }
      );

      if (!response.ok) {
        const data = await response.json();

        throw new Error(
          data.message ??
            "Failed to save settings"
        );
      }

      const updated =
        (await response.json()) as AdminSettings;

      setSettings(updated);
      setSuccess(true);

      window.setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Could not save settings."
      );
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-zinc-500">
          <Loader2
            size={18}
            className="animate-spin"
          />

          Loading settings...
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            <CheckCircle2 size={16} />
            Settings saved successfully.
          </div>
        )}

        <section className="rounded-xl border border-zinc-200 bg-white">
          <div className="border-b border-zinc-200 px-6 py-5">
            <h2 className="font-semibold text-zinc-900">
              Administrator profile
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Manage your administrator account information.
            </p>
          </div>

          <div className="space-y-5 p-6">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-zinc-700"
              >
                Name
              </label>

              <div className="relative">
                <User
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                />

                <input
                  id="name"
                  type="text"
                  value={settings.name}
                  onChange={(event) =>
                    setSettings((current) => ({
                      ...current,
                      name: event.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-zinc-200 py-2.5 pl-10 pr-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-400"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-zinc-700"
              >
                Email
              </label>

              <div className="relative">
                <Mail
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                />

                <input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(event) =>
                    setSettings((current) => ({
                      ...current,
                      email: event.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-zinc-200 py-2.5 pl-10 pr-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-400"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-zinc-200 bg-white">
          <div className="border-b border-zinc-200 px-6 py-5">
            <h2 className="font-semibold text-zinc-900">
              Workspace
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Configure FlowDesk workspace preferences.
            </p>
          </div>

          <div className="space-y-5 p-6">
            <div>
              <label
                htmlFor="company"
                className="mb-2 block text-sm font-medium text-zinc-700"
              >
                Company name
              </label>

              <div className="relative">
                <Building2
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                />

                <input
                  id="company"
                  type="text"
                  value={settings.companyName}
                  onChange={(event) =>
                    setSettings((current) => ({
                      ...current,
                      companyName:
                        event.target.value,
                    }))
                  }
                  className="w-full rounded-lg border border-zinc-200 py-2.5 pl-10 pr-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-400"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="timezone"
                className="mb-2 block text-sm font-medium text-zinc-700"
              >
                Timezone
              </label>

              <select
                id="timezone"
                value={settings.timezone}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...current,
                    timezone:
                      event.target.value,
                  }))
                }
                className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition focus:border-zinc-400"
              >
                <option value="UTC">
                  UTC
                </option>

                <option value="Europe/Berlin">
                  Europe / Berlin
                </option>

                <option value="Europe/Moscow">
                  Europe / Moscow
                </option>

                <option value="America/New_York">
                  America / New York
                </option>

                <option value="America/Los_Angeles">
                  America / Los Angeles
                </option>

                <option value="Asia/Dubai">
                  Asia / Dubai
                </option>
              </select>
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? (
              <Loader2
                size={16}
                className="animate-spin"
              />
            ) : (
              <Save size={16} />
            )}

            {isSaving
              ? "Saving..."
              : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}