import type { UserPlan } from "../../types/user";

type UserPlanBadgeProps = {
  plan: UserPlan;
};

const planStyles: Record<UserPlan, string> = {
  Free: "bg-zinc-100 text-zinc-700",
  Pro: "bg-indigo-50 text-indigo-700",
  Business: "bg-violet-50 text-violet-700",
};

export default function UserPlanBadge({
  plan,
}: UserPlanBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-md px-2.5 py-1 text-xs font-medium ${planStyles[plan]}`}
    >
      {plan}
    </span>
  );
}