import { NextResponse } from "next/server";

import { prisma } from "../../../lib/prisma";

import type {
  SubscriptionStatus,
} from "../../../types/subscription";

import type {
  UserPlan,
} from "../../../types/user";

export async function GET() {
  try {
    const subscriptions =
      await prisma.subscription.findMany({
        include: {
          user: true,
        },

        orderBy: {
          createdAt: "desc",
        },
      });

    const formattedSubscriptions =
      subscriptions.map((subscription) => ({
        id: subscription.id,

        plan: subscription.plan as UserPlan,

        status:
          subscription.status as SubscriptionStatus,

        price: subscription.price / 100,

        startedAt:
          subscription.startedAt.toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "numeric",
              year: "numeric",
            }
          ),

        endsAt: subscription.endsAt
          ? subscription.endsAt.toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "numeric",
                year: "numeric",
              }
            )
          : null,

        user: {
          id: subscription.user.id,
          name: subscription.user.name,
          email: subscription.user.email,
        },
      }));

    return NextResponse.json(
      formattedSubscriptions
    );
  } catch {
    return NextResponse.json(
      {
        message:
          "Failed to load subscriptions",
      },
      {
        status: 500,
      }
    );
  }
}