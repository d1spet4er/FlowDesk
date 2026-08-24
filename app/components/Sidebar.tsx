"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Package,
  Tag,
  BarChart3,
  Settings,
} from "lucide-react";

const menu = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Payments",
    href: "/admin/payments",
    icon: CreditCard,
  },
  {
    title: "Plans",
    href: "/admin/plans",
    icon: Package,
  },
  {
    title: "Promocodes",
    href: "/admin/promocodes",
    icon: Tag,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-zinc-200 bg-white">
      <div className="flex h-20 items-center border-b border-zinc-200 px-6">
        <div>
          <div className="text-xl font-bold text-zinc-900">FlowDesk</div>
          <div className="text-xs text-zinc-500">Admin panel</div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900"
            >
              <Icon size={18} />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-zinc-200 p-4">
        <div className="rounded-lg bg-zinc-100 p-3">
          <div className="text-sm font-medium text-zinc-900">
            Admin account
          </div>

          <div className="mt-1 text-xs text-zinc-500">
            admin@flowdesk.com
          </div>
        </div>
      </div>
    </aside>
  );
}