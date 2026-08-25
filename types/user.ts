export type UserStatus = "Active" | "Inactive" | "Blocked";

export type UserPlan = "Free" | "Pro" | "Business";

export type User = {
  id: number;
  name: string;
  email: string;
  plan: UserPlan;
  status: UserStatus;
  joinedAt: string;
};