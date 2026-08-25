import type { DashboardStat } from "../../types/dashboard";

type StatCardProps = DashboardStat;

export default function StatCard({
  title,
  value,
  change,
  description,
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6">
      <p className="text-sm text-zinc-500">
        {title}
      </p>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-3xl font-semibold text-zinc-900">
          {value}
        </p>

        <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
          {change}
        </span>
      </div>

      <p className="mt-3 text-xs text-zinc-400">
        {description}
      </p>
    </div>
  );
}