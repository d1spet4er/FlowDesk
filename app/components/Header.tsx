"use client";

import {
  Bell,
  Menu,
  Search,
} from "lucide-react";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import LogoutButton from "./LogoutButton";

type HeaderProps = {
  onMenuClick?: () => void;
};

const pageTitles: Record<
  string,
  {
    title: string;
    description: string;
  }
> = {
  "/admin": {
    title: "Dashboard",
    description: "Overview of your platform",
  },

  "/admin/users": {
    title: "Users",
    description: "Manage FlowDesk users",
  },

  "/admin/subscriptions": {
    title: "Subscriptions",
    description: "Manage subscriptions and pricing plans",
  },

  "/admin/payments": {
    title: "Payments",
    description: "View payments and transaction history",
  },

  "/admin/analytics": {
    title: "Analytics",
    description: "Analyze platform performance",
  },

  "/admin/settings": {
    title: "Settings",
    description: "Configure FlowDesk settings",
  },
};

export default function Header({
  onMenuClick,
}: HeaderProps) {
  const pathname = usePathname();
  const { data: session } = useSession();

  const currentPage = pageTitles[pathname] ?? {
    title: "FlowDesk",
    description: "Admin Console",
  };

  const name =
    session?.user?.name ?? "Administrator";

  const email =
    session?.user?.email ?? "";

  const initial =
    name.trim().charAt(0).toUpperCase() || "A";

  return (
    <header className="flex min-h-20 items-center justify-between gap-4 border-b border-zinc-200 bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg border border-zinc-200 p-2.5 text-zinc-600 transition hover:bg-zinc-100 lg:hidden"
        >
          <Menu size={18} />
        </button>

        <div className="min-w-0">
          <h1 className="truncate text-lg font-semibold text-zinc-900 sm:text-xl">
            {currentPage.title}
          </h1>

          <p className="hidden truncate text-sm text-zinc-500 sm:block">
            {currentPage.description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
        <button
          type="button"
          className="hidden rounded-lg border border-zinc-200 p-2.5 text-zinc-600 transition hover:bg-zinc-100 sm:block"
        >
          <Search size={18} />
        </button>

        <button
          type="button"
          className="relative rounded-lg border border-zinc-200 p-2.5 text-zinc-600 transition hover:bg-zinc-100"
        >
          <Bell size={18} />

          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
        </button>

        <div className="hidden items-center gap-3 border-l border-zinc-200 pl-3 md:flex">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900 text-sm font-medium text-white">
            {initial}
          </div>

          <div className="hidden xl:block">
            <div className="text-sm font-medium text-zinc-900">
              {name}
            </div>

            <div className="text-xs text-zinc-500">
              {email}
            </div>
          </div>
        </div>

        <LogoutButton />
      </div>
    </header>
  );
}