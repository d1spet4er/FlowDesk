import { NextResponse } from "next/server";

import { prisma } from "../../../lib/prisma";

import type {
  PaymentMethod,
  PaymentStatus,
} from "../../../types/payment";

export async function GET() {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        user: true,
        subscription: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedPayments = payments.map((payment) => ({
      id: payment.id,
      amount: payment.amount / 100,
      currency: payment.currency,
      status: payment.status as PaymentStatus,
      method: payment.method as PaymentMethod,

      paidAt: payment.paidAt
        ? payment.paidAt.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : null,

      createdAt: payment.createdAt.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),

      user: {
        id: payment.user.id,
        name: payment.user.name,
        email: payment.user.email,
      },

      subscription: payment.subscription
        ? {
            id: payment.subscription.id,
            plan: payment.subscription.plan,
          }
        : null,
    }));

    return NextResponse.json(formattedPayments);
  } catch {
    return NextResponse.json(
      {
        message: "Failed to load payments",
      },
      {
        status: 500,
      }
    );
  }
}