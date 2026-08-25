import { NextResponse } from "next/server";

import { prisma } from "../../../lib/prisma";
import { requireAdmin } from "../../../lib/require-admin";

export async function GET() {
  const { error } = await requireAdmin();

  if (error) {
    return error;
  }

  try {
    const [
      totalUsers,
      activeSubscriptions,
      succeededPayments,
      failedPayments,
      subscriptions,
    ] = await Promise.all([
      prisma.user.count(),

      prisma.subscription.count({
        where: {
          status: "Active",
        },
      }),

      prisma.payment.findMany({
        where: {
          status: "Succeeded",
        },

        select: {
          amount: true,
          paidAt: true,
        },
      }),

      prisma.payment.count({
        where: {
          status: "Failed",
        },
      }),

      prisma.subscription.findMany({
        select: {
          plan: true,
        },
      }),
    ]);

    const totalRevenueInCents =
      succeededPayments.reduce(
        (total, payment) =>
          total + payment.amount,
        0
      );

    const totalRevenue =
      totalRevenueInCents / 100;

    const now = new Date();

    const revenue = Array.from(
      {
        length: 6,
      },
      (_, index) => {
        const date = new Date(
          now.getFullYear(),
          now.getMonth() - (5 - index),
          1
        );

        const month = date.toLocaleDateString(
          "en-US",
          {
            month: "short",
          }
        );

        const monthRevenueInCents =
          succeededPayments.reduce(
            (total, payment) => {
              if (!payment.paidAt) {
                return total;
              }

              const paymentDate =
                payment.paidAt;

              const sameMonth =
                paymentDate.getMonth() ===
                  date.getMonth() &&
                paymentDate.getFullYear() ===
                  date.getFullYear();

              if (!sameMonth) {
                return total;
              }

              return (
                total + payment.amount
              );
            },
            0
          );

        return {
          month,
          revenue:
            monthRevenueInCents / 100,
        };
      }
    );

    const planCounts =
      subscriptions.reduce<
        Record<string, number>
      >((accumulator, subscription) => {
        accumulator[subscription.plan] =
          (accumulator[
            subscription.plan
          ] ?? 0) + 1;

        return accumulator;
      }, {});

    const plans = [
      {
        name: "Free",
        value: planCounts.Free ?? 0,
      },
      {
        name: "Pro",
        value: planCounts.Pro ?? 0,
      },
      {
        name: "Business",
        value:
          planCounts.Business ?? 0,
      },
    ];

    return NextResponse.json({
      metrics: {
        totalUsers,
        activeSubscriptions,
        totalRevenue,
        failedPayments,
      },

      revenue,

      plans,
    });
  } catch (error) {
    console.error(
      "Analytics API error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Failed to load analytics",
      },
      {
        status: 500,
      }
    );
  }
}