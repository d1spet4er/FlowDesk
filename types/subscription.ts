import type { UserPlan } from "./user";

export type SubscriptionStatus =
  | "Active"
  | "Canceled"
  | "PastDue";

export type Subscription = {
  id: number;
  plan: UserPlan;
  status: SubscriptionStatus;
  price: number;
  startedAt: string;
  endsAt: string | null;

  user: {
    id: number;
    name: string;
    email: string;
  };
};