import { Bell, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-zinc-200 bg-white px-8">
      <div>
        <h1 className="text-xl font-semibold text-zinc-900">Dashboard</h1>
        <p className="text-sm text-zinc-500">
          Overview of your platform
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-lg border border-zinc-200 p-2.5 text-zinc-600 transition hover:bg-zinc-100">
          <Search size={18} />
        </button>

        <button className="relative rounded-lg border border-zinc-200 p-2.5 text-zinc-600 transition hover:bg-zinc-100">
          <Bell size={18} />

          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-3 border-l border-zinc-200 pl-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-sm font-medium text-white">
            A
          </div>

          <div>
            <div className="text-sm font-medium text-zinc-900">
              Admin
            </div>

            <div className="text-xs text-zinc-500">
              Administrator
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}