import type { UserStatus } from "../../types/user";

type UserStatusBadgeProps = {
  status: UserStatus;
};

const statusStyles: Record<UserStatus, string> = {
  Active: "bg-emerald-50 text-emerald-700",
  Inactive: "bg-zinc-100 text-zinc-600",
  Blocked: "bg-red-50 text-red-700",
};

export default function UserStatusBadge({
  status,
}: UserStatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}