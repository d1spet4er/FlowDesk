"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { revenueData } from "../../data/dashboard";

export default function RevenueChart() {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6 xl:col-span-2">
      <div className="mb-6">
        <h3 className="font-semibold text-zinc-900">
          Revenue overview
        </h3>

        <p className="mt-1 text-sm text-zinc-500">
          Monthly revenue for the current year
        </p>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={revenueData}>
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
              tickFormatter={(value) => `$${value / 1000}k`}
            />

            <Tooltip
              formatter={(value) => [
                `$${Number(value).toLocaleString()}`,
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
  );
}