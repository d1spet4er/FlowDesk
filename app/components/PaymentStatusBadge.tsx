import type {
  PaymentStatus,
} from "../../types/payment";

type PaymentStatusBadgeProps = {
  status: PaymentStatus;
};

const statusStyles: Record<
  PaymentStatus,
  string
> = {
  Succeeded:
    "bg-emerald-50 text-emerald-700",

  Pending:
    "bg-amber-50 text-amber-700",

  Failed:
    "bg-red-50 text-red-700",

  Refunded:
    "bg-blue-50 text-blue-700",
};

export default function PaymentStatusBadge({
  status,
}: PaymentStatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}