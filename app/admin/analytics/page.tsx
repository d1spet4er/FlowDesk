"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  AlertTriangle,
  CreditCard,
  DollarSign,
  Loader2,
  Users,
} from "lucide-react";

import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type {
  AnalyticsData,
} from "../../../types/analytics";

export default function AnalyticsPage() {
  const [analytics, setAnalytics] =
    useState<AnalyticsData | null>(
      null
    );

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          "/api/analytics"
        );

        if (!response.ok) {
          throw new Error(
            "Failed to load analytics"
          );
        }

        const data =
          (await response.json()) as AnalyticsData;

        setAnalytics(data);
      } catch {
        setError(
          "Could not load analytics."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadAnalytics();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-zinc-500">
          <Loader2
            size={18}
            className="animate-spin"
          />

          Loading analytics...
        </div>
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="mx-auto w-full max-w-6xl">
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error ??
            "Analytics data is unavailable."}
        </div>
      </div>
    );
  }

  const metrics = [
    {
      title: "Total users",
      value:
        analytics.metrics.totalUsers.toLocaleString(),
      description:
        "Registered FlowDesk users",
      icon: Users,
    },

    {
      title: "Active subscriptions",
      value:
        analytics.metrics.activeSubscriptions.toLocaleString(),
      description:
        "Currently active subscriptions",
      icon: CreditCard,
    },

    {
      title: "Total revenue",
      value: `$${analytics.metrics.totalRevenue.toLocaleString(
        "en-US",
        {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }
      )}`,
      description:
        "Successful payments",
      icon: DollarSign,
    },

    {
      title: "Failed payments",
      value:
        analytics.metrics.failedPayments.toLocaleString(),
      description:
        "Payments requiring attention",
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6">
      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div
              key={metric.title}
              className="rounded-xl border border-zinc-200 bg-white p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-zinc-500">
                    {metric.title}
                  </p>

                  <p className="mt-3 text-2xl font-bold text-zinc-900">
                    {metric.value}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600">
                  <Icon size={18} />
                </div>
              </div>

              <p className="mt-3 text-xs text-zinc-400">
                {metric.description}
              </p>
            </div>
          );
        })}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-6 xl:col-span-2">
          <div>
            <h2 className="font-semibold text-zinc-900">
              Revenue
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Successful payments over the last
              6 months
            </p>
          </div>

          <div className="mt-6 h-72 w-full">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <LineChart
                data={analytics.revenue}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  fontSize={12}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  fontSize={12}
                  tickFormatter={(value) =>
                    `$${value}`
                  }
                />

                <Tooltip
                  formatter={(value) => [
                    `$${Number(
                      value
                    ).toFixed(2)}`,
                    "Revenue",
                  ]}
                />

                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="currentColor"
                  strokeWidth={2}
                  dot={{
                    r: 4,
                    fill: "white",
                    strokeWidth: 2,
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-6">
          <div>
            <h2 className="font-semibold text-zinc-900">
              Plans
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              Subscription distribution
            </p>
          </div>

          <div className="mt-4 h-56">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={analytics.plans}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                >
                  {analytics.plans.map(
                    (plan) => (
                      <Cell
                        key={plan.name}
                        fill="currentColor"
                        opacity={
                          plan.name ===
                          "Business"
                            ? 1
                            : plan.name ===
                                "Pro"
                              ? 0.65
                              : 0.35
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {analytics.plans.map(
              (plan) => (
                <div
                  key={plan.name}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm text-zinc-600">
                    {plan.name}
                  </span>

                  <span className="text-sm font-semibold text-zinc-900">
                    {plan.value}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
}