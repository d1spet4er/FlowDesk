import StatCard from "../components/StatCard";
import RecentActivity from "../components/RecentActivity";
import RevenueChart from "../components/RevenueChart";

import {
  dashboardStats,
  recentActivity,
} from "../../data/dashboard";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold text-zinc-900">
          Good morning, Admin
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Here&apos;s what&apos;s happening with FlowDesk today.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            description={stat.description}
          />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <RevenueChart />

        <RecentActivity activities={recentActivity} />
      </section>
    </div>
  );
}