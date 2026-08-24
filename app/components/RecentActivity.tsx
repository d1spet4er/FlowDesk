import type { DashboardActivity } from "../../types/dashboard";

type RecentActivityProps = {
  activities: DashboardActivity[];
};

export default function RecentActivity({
  activities,
}: RecentActivityProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-6">
      <h3 className="font-semibold text-zinc-900">
        Recent activity
      </h3>

      <div className="mt-6 space-y-5">
        {activities.map((activity) => (
          <div key={`${activity.title}-${activity.time}`}>
            <p className="text-sm text-zinc-900">
              {activity.title}
            </p>

            <p className="mt-1 text-xs text-zinc-500">
              {activity.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}