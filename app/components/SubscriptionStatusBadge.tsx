import type {
  SubscriptionStatus,
} from "../../types/subscription";

type SubscriptionStatusBadgeProps = {
  status: SubscriptionStatus;
};

const statusStyles: Record<
  SubscriptionStatus,
  string
> = {
  Active:
    "bg-emerald-50 text-emerald-700",

  Canceled:
    "bg-zinc-100 text-zinc-600",

  PastDue:
    "bg-amber-50 text-amber-700",
};

const statusLabels: Record<
  SubscriptionStatus,
  string
> = {
  Active: "Active",
  Canceled: "Canceled",
  PastDue: "Past due",
};

export default function SubscriptionStatusBadge({
  status,
}: SubscriptionStatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}