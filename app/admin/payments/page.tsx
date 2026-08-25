"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Loader2,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import PaymentStatusBadge from "../../components/PaymentStatusBadge";

import type {
  Payment,
  PaymentStatus,
} from "../../../types/payment";

type StatusFilter =
  | "All"
  | PaymentStatus;

export default function PaymentsPage() {
  const [payments, setPayments] =
    useState<Payment[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("All");

  useEffect(() => {
    async function loadPayments() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          "/api/payments"
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load payments"
          );
        }

        const data =
          (await response.json()) as Payment[];

        setPayments(data);
      } catch {
        setError(
          "Could not load payments."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadPayments();
  }, []);

  const filteredPayments =
    useMemo(() => {
      const query =
        searchQuery.trim().toLowerCase();

      return payments.filter(
        (payment) => {
          const matchesSearch =
            !query ||
            payment.user.name
              .toLowerCase()
              .includes(query) ||
            payment.user.email
              .toLowerCase()
              .includes(query) ||
            payment.method
              .toLowerCase()
              .includes(query);

          const matchesStatus =
            statusFilter === "All" ||
            payment.status ===
              statusFilter;

          return (
            matchesSearch &&
            matchesStatus
          );
        }
      );
    }, [
      payments,
      searchQuery,
      statusFilter,
    ]);

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    statusFilter !== "All";

  function clearFilters() {
    setSearchQuery("");
    setStatusFilter("All");
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white">
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
                placeholder="Search payments..."
                className="w-full rounded-lg border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 pr-1 text-sm text-zinc-500">
                <SlidersHorizontal size={16} />
                Filters
              </div>

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(
                    event.target
                      .value as StatusFilter
                  )
                }
                className="rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-700 outline-none"
              >
                <option value="All">
                  All statuses
                </option>

                <option value="Succeeded">
                  Succeeded
                </option>

                <option value="Pending">
                  Pending
                </option>

                <option value="Failed">
                  Failed
                </option>

                <option value="Refunded">
                  Refunded
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
                {filteredPayments.length} payments
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

              Loading payments...
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50">
                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">
                    Customer
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">
                    Plan
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">
                    Amount
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">
                    Status
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">
                    Method
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">
                    Paid
                  </th>
                </tr>
              </thead>

              <tbody>
                {filteredPayments.length > 0 ? (
                  filteredPayments.map(
                    (payment) => (
                      <tr
                        key={payment.id}
                        className="border-b border-zinc-100 transition last:border-b-0 hover:bg-zinc-50"
                      >
                        <td className="px-5 py-4">
                          <p className="text-sm font-medium text-zinc-900">
                            {payment.user.name}
                          </p>

                          <p className="mt-0.5 text-xs text-zinc-500">
                            {payment.user.email}
                          </p>
                        </td>

                        <td className="px-5 py-4 text-sm text-zinc-700">
                          {payment.subscription
                            ?.plan ?? "—"}
                        </td>

                        <td className="px-5 py-4 text-sm font-semibold text-zinc-900">
                          {payment.currency === "USD"
                            ? "$"
                            : `${payment.currency} `}
                          {payment.amount.toFixed(
                            2
                          )}
                        </td>

                        <td className="px-5 py-4">
                          <PaymentStatusBadge
                            status={
                              payment.status
                            }
                          />
                        </td>

                        <td className="px-5 py-4 text-sm text-zinc-500">
                          {payment.method}
                        </td>

                        <td className="px-5 py-4 text-sm text-zinc-500">
                          {payment.paidAt ??
                            "—"}
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-14 text-center"
                    >
                      <p className="text-sm font-medium text-zinc-900">
                        No payments found
                      </p>

                      <p className="mt-1 text-sm text-zinc-500">
                        Try changing your search or filters.
                      </p>

                      {hasActiveFilters && (
                        <button
                          type="button"
                          onClick={clearFilters}
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
  );
}