"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Loader2,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";

import AddUserModal from "../../components/AddUserModal";
import DeleteUserModal from "../../components/DeleteUserModal";
import EditUserModal from "../../components/EditUserModal";
import UserPlanBadge from "../../components/UserPlanBadge";
import UserStatusBadge from "../../components/UserStatusBadge";

import type {
  User,
  UserPlan,
  UserStatus,
} from "../../../types/user";

type PlanFilter = "All" | UserPlan;
type StatusFilter = "All" | UserStatus;

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [planFilter, setPlanFilter] =
    useState<PlanFilter>("All");

  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("All");

  const [isAddUserOpen, setIsAddUserOpen] =
    useState(false);

  const [editingUser, setEditingUser] =
    useState<User | null>(null);

  const [deletingUser, setDeletingUser] =
    useState<User | null>(null);

  const [openMenuId, setOpenMenuId] =
    useState<number | null>(null);

  useEffect(() => {
    async function loadUsers() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/users");

        if (!response.ok) {
          throw new Error(
            "Failed to load users"
          );
        }

        const data =
          (await response.json()) as User[];

        setUsers(data);
      } catch {
        setError(
          "Could not load users. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const query =
      searchQuery.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !query ||
        user.name
          .toLowerCase()
          .includes(query) ||
        user.email
          .toLowerCase()
          .includes(query) ||
        user.plan
          .toLowerCase()
          .includes(query) ||
        user.status
          .toLowerCase()
          .includes(query);

      const matchesPlan =
        planFilter === "All" ||
        user.plan === planFilter;

      const matchesStatus =
        statusFilter === "All" ||
        user.status === statusFilter;

      return (
        matchesSearch &&
        matchesPlan &&
        matchesStatus
      );
    });
  }, [
    users,
    searchQuery,
    planFilter,
    statusFilter,
  ]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    planFilter !== "All" ||
    statusFilter !== "All";

  function clearFilters() {
    setSearchQuery("");
    setPlanFilter("All");
    setStatusFilter("All");
  }

  async function handleAddUser(user: User) {
    try {
      setError(null);

      const response = await fetch(
        "/api/users",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to create user"
        );
      }

      const createdUser =
        (await response.json()) as User;

      setUsers((currentUsers) => [
        createdUser,
        ...currentUsers,
      ]);
    } catch {
      setError(
        "Could not create user."
      );
    }
  }

  async function handleSaveUser(
    updatedUser: User
  ) {
    try {
      setError(null);

      const response = await fetch(
        `/api/users/${updatedUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to update user"
        );
      }

      const savedUser =
        (await response.json()) as User;

      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === savedUser.id
            ? savedUser
            : user
        )
      );
    } catch {
      setError(
        "Could not update user."
      );
    }
  }

  async function handleDeleteUser(
    userId: number
  ) {
    try {
      setError(null);

      const response = await fetch(
        `/api/users/${userId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to delete user"
        );
      }

      setUsers((currentUsers) =>
        currentUsers.filter(
          (user) => user.id !== userId
        )
      );
    } catch {
      setError(
        "Could not delete user."
      );
    }
  }

  return (
    <>
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={() =>
              setIsAddUserOpen(true)
            }
            className="flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
          >
            <Plus size={16} />
            Add user
          </button>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="overflow-visible rounded-xl border border-zinc-200 bg-white">
          <div className="border-b border-zinc-200 p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="relative w-full max-w-md">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(
                      event.target.value
                    )
                  }
                  placeholder="Search users..."
                  className="w-full rounded-lg border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 pr-1 text-sm text-zinc-500">
                  <SlidersHorizontal
                    size={16}
                  />
                  Filters
                </div>

                <select
                  value={planFilter}
                  onChange={(event) =>
                    setPlanFilter(
                      event.target
                        .value as PlanFilter
                    )
                  }
                  className="rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-700 outline-none transition focus:border-zinc-400"
                >
                  <option value="All">
                    All plans
                  </option>

                  <option value="Free">
                    Free
                  </option>

                  <option value="Pro">
                    Pro
                  </option>

                  <option value="Business">
                    Business
                  </option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(
                      event.target
                        .value as StatusFilter
                    )
                  }
                  className="rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-700 outline-none transition focus:border-zinc-400"
                >
                  <option value="All">
                    All statuses
                  </option>

                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>

                  <option value="Blocked">
                    Blocked
                  </option>
                </select>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
                  >
                    Clear
                  </button>
                )}

                <span className="ml-1 whitespace-nowrap text-sm text-zinc-500">
                  {filteredUsers.length} users
                </span>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex min-h-72 items-center justify-center">
              <div className="flex items-center gap-3 text-sm text-zinc-500">
                <Loader2
                  size={18}
                  className="animate-spin"
                />

                Loading users...
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-fixed">
                <thead>
                  <tr className="border-b border-zinc-200 bg-zinc-50">
                    <th className="w-[40%] px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">
                      User
                    </th>

                    <th className="w-[15%] px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">
                      Plan
                    </th>

                    <th className="w-[15%] px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">
                      Status
                    </th>

                    <th className="w-[20%] px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">
                      Joined
                    </th>

                    <th className="w-[10%] px-5 py-3" />
                  </tr>
                </thead>

                <tbody>
                  {filteredUsers.length >
                  0 ? (
                    filteredUsers.map(
                      (user) => (
                        <tr
                          key={user.id}
                          className="border-b border-zinc-100 transition last:border-b-0 hover:bg-zinc-50"
                        >
                          <td className="px-5 py-4">
                            <div className="flex min-w-0 items-center gap-3">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-semibold text-white">
                                {user.name
                                  .split(" ")
                                  .map(
                                    (part) =>
                                      part[0]
                                  )
                                  .join("")
                                  .slice(0, 2)}
                              </div>

                              <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-zinc-900">
                                  {
                                    user.name
                                  }
                                </p>

                                <p className="mt-0.5 truncate text-xs text-zinc-500">
                                  {
                                    user.email
                                  }
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <UserPlanBadge
                              plan={
                                user.plan
                              }
                            />
                          </td>

                          <td className="px-5 py-4">
                            <UserStatusBadge
                              status={
                                user.status
                              }
                            />
                          </td>

                          <td className="px-5 py-4 text-sm text-zinc-500">
                            {
                              user.joinedAt
                            }
                          </td>

                          <td className="relative px-5 py-4 text-right">
                            <button
                              type="button"
                              onClick={() =>
                                setOpenMenuId(
                                  openMenuId ===
                                    user.id
                                    ? null
                                    : user.id
                                )
                              }
                              className="rounded-md p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900"
                            >
                              <MoreHorizontal
                                size={18}
                              />
                            </button>

                            {openMenuId ===
                              user.id && (
                              <div className="absolute right-5 top-12 z-20 w-40 rounded-lg border border-zinc-200 bg-white p-1 shadow-lg">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingUser(
                                      user
                                    );

                                    setOpenMenuId(
                                      null
                                    );
                                  }}
                                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-zinc-700 transition hover:bg-zinc-100"
                                >
                                  <Pencil
                                    size={15}
                                  />
                                  Edit
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setDeletingUser(
                                      user
                                    );

                                    setOpenMenuId(
                                      null
                                    );
                                  }}
                                  className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
                                >
                                  <Trash2
                                    size={15}
                                  />
                                  Delete
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-5 py-14 text-center"
                      >
                        <p className="text-sm font-medium text-zinc-900">
                          No users found
                        </p>

                        <p className="mt-1 text-sm text-zinc-500">
                          Try changing your
                          search or filters.
                        </p>

                        {hasActiveFilters && (
                          <button
                            type="button"
                            onClick={
                              clearFilters
                            }
                            className="mt-4 rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
                          >
                            Clear filters
                          </button>
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <AddUserModal
        isOpen={isAddUserOpen}
        onClose={() =>
          setIsAddUserOpen(false)
        }
        onAddUser={handleAddUser}
      />

      <EditUserModal
        isOpen={editingUser !== null}
        user={editingUser}
        onClose={() =>
          setEditingUser(null)
        }
        onSave={handleSaveUser}
      />

      <DeleteUserModal
        isOpen={deletingUser !== null}
        user={deletingUser}
        onClose={() =>
          setDeletingUser(null)
        }
        onConfirm={handleDeleteUser}
      />
    </>
  );
}