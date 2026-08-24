"use client";

import { useMemo, useState } from "react";
import { MoreHorizontal, Plus, Search } from "lucide-react";

import UserPlanBadge from "../../components/UserPlanBadge";
import UserStatusBadge from "../../components/UserStatusBadge";

import { users } from "../../../data/users";

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return users;
    }

    return users.filter((user) => {
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.plan.toLowerCase().includes(query) ||
        user.status.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button className="flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800">
          <Plus size={16} />
          Add user
        </button>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white">
        <div className="flex items-center justify-between border-b border-zinc-200 p-5">
          <div className="relative w-full max-w-sm">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
            />

            <input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search users..."
              className="w-full rounded-lg border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400"
            />
          </div>

          <div className="ml-4 text-sm text-zinc-500">
            {filteredUsers.length} users
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50">
                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">
                  User
                </th>

                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">
                  Plan
                </th>

                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">
                  Status
                </th>

                <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">
                  Joined
                </th>

                <th className="w-16 px-5 py-3" />
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-zinc-100 transition last:border-b-0 hover:bg-zinc-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-semibold text-white">
                          {user.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div>
                          <p className="text-sm font-medium text-zinc-900">
                            {user.name}
                          </p>

                          <p className="mt-0.5 text-xs text-zinc-500">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <UserPlanBadge plan={user.plan} />
                    </td>

                    <td className="px-5 py-4">
                      <UserStatusBadge status={user.status} />
                    </td>

                    <td className="px-5 py-4 text-sm text-zinc-500">
                      {user.joinedAt}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <button className="rounded-md p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900">
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-12 text-center text-sm text-zinc-500"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}