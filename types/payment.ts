export type PaymentStatus =
  | "Succeeded"
  | "Pending"
  | "Failed"
  | "Refunded";

export type PaymentMethod =
  | "Card"
  | "PayPal"
  | "BankTransfer";

export type Payment = {
  id: number;
  amount: number;
  currency: string;
  status: PaymentStatus;
  method: PaymentMethod;
  paidAt: string | null;
  createdAt: string;

  user: {
    id: number;
    name: string;
    email: string;
  };

  subscription: {
    id: number;
    plan: string;
  } | null;
};