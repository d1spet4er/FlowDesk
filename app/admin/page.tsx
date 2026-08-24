const stats = [
  {
    title: "Total users",
    value: "12,482",
    change: "+12.5%",
  },
  {
    title: "Active subscriptions",
    value: "8,921",
    change: "+8.2%",
  },
  {
    title: "Revenue",
    value: "$48,291",
    change: "+14.8%",
  },
  {
    title: "Conversion rate",
    value: "7.84%",
    change: "+2.1%",
  },
];

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
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl border border-zinc-200 bg-white p-6"
          >
            <p className="text-sm text-zinc-500">{stat.title}</p>

            <div className="mt-3 flex items-end justify-between">
              <span className="text-2xl font-bold text-zinc-900">
                {stat.value}
              </span>

              <span className="text-sm font-medium text-emerald-600">
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-6 xl:col-span-2">
          <div className="mb-6">
            <h3 className="font-semibold text-zinc-900">
              Revenue overview
            </h3>

            <p className="mt-1 text-sm text-zinc-500">
              Monthly revenue for the current year
            </p>
          </div>

          <div className="flex h-72 items-center justify-center rounded-lg bg-zinc-50 text-sm text-zinc-400">
            Chart will be here
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-6">
          <h3 className="font-semibold text-zinc-900">
            Recent activity
          </h3>

          <div className="mt-6 space-y-5">
            <div>
              <p className="text-sm text-zinc-900">
                New user registered
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                5 minutes ago
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-900">
                New Pro subscription
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                24 minutes ago
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-900">
                Payment received
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                1 hour ago
              </p>
            </div>

            <div>
              <p className="text-sm text-zinc-900">
                Promocode created
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                2 hours ago
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}