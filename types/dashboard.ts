export type DashboardStat = {
  title: string;
  value: string;
  change: string;
  description: string;
};

export type DashboardActivity = {
  title: string;
  time: string;
};

export type RevenueDataPoint = {
  month: string;
  revenue: number;
};