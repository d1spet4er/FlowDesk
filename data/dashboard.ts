import type {
  DashboardActivity,
  DashboardStat,
  RevenueDataPoint,
} from "../types/dashboard";

export const dashboardStats: DashboardStat[] = [
  {
    title: "Total users",
    value: "12,482",
    change: "+12.5%",
    description: "in the last 30 days",
  },
  {
    title: "Active subscriptions",
    value: "8,921",
    change: "+8.2%",
    description: "compared to last month",
  },
  {
    title: "Revenue",
    value: "$48,291",
    change: "+14.8%",
    description: "for the current month",
  },
  {
    title: "Conversion rate",
    value: "7.84%",
    change: "+2.1%",
    description: "compared to last month",
  },
];

export const recentActivity: DashboardActivity[] = [
  {
    title: "New user registered",
    time: "5 minutes ago",
  },
  {
    title: "New Pro subscription",
    time: "24 minutes ago",
  },
  {
    title: "Payment received",
    time: "1 hour ago",
  },
  {
    title: "Promocode created",
    time: "2 hours ago",
  },
];

export const revenueData: RevenueDataPoint[] = [
  {
    month: "Jan",
    revenue: 28000,
  },
  {
    month: "Feb",
    revenue: 32000,
  },
  {
    month: "Mar",
    revenue: 35000,
  },
  {
    month: "Apr",
    revenue: 39000,
  },
  {
    month: "May",
    revenue: 42000,
  },
  {
    month: "Jun",
    revenue: 46000,
  },
  {
    month: "Jul",
    revenue: 51000,
  },
  {
    month: "Aug",
    revenue: 54000,
  },
];