export type AnalyticsMetric = {
  title: string;
  value: string;
  description: string;
};

export type RevenueChartPoint = {
  month: string;
  revenue: number;
};

export type PlanDistributionPoint = {
  name: string;
  value: number;
};

export type AnalyticsData = {
  metrics: {
    totalUsers: number;
    activeSubscriptions: number;
    totalRevenue: number;
    failedPayments: number;
  };

  revenue: RevenueChartPoint[];

  plans: PlanDistributionPoint[];
};