import "dotenv/config";

import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString =
  process.env.DIRECT_URL ?? process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DIRECT_URL or DATABASE_URL is not defined"
  );
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const passwordHash = await bcrypt.hash(
    "FlowDesk123!",
    12
  );

  await prisma.admin.upsert({
    where: {
      email: "admin@flowdesk.dev",
    },
    update: {
      name: "FlowDesk Admin",
      passwordHash,
      role: "ADMIN",
      timezone: "Europe/Berlin",
      companyName: "FlowDesk",
    },
    create: {
      name: "FlowDesk Admin",
      email: "admin@flowdesk.dev",
      passwordHash,
      role: "ADMIN",
      timezone: "Europe/Berlin",
      companyName: "FlowDesk",
    },
  });

  const users = [
    {
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      plan: "Pro",
      status: "Active",
      joinedAt: new Date("2026-08-24"),
    },
    {
      name: "Maria Garcia",
      email: "maria.garcia@example.com",
      plan: "Business",
      status: "Active",
      joinedAt: new Date("2026-08-22"),
    },
    {
      name: "Daniel Smith",
      email: "daniel.smith@example.com",
      plan: "Free",
      status: "Inactive",
      joinedAt: new Date("2026-08-20"),
    },
    {
      name: "Sophia Brown",
      email: "sophia.brown@example.com",
      plan: "Pro",
      status: "Active",
      joinedAt: new Date("2026-08-18"),
    },
    {
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
      plan: "Business",
      status: "Blocked",
      joinedAt: new Date("2026-08-15"),
    },
    {
      name: "Emma Davis",
      email: "emma.davis@example.com",
      plan: "Free",
      status: "Active",
      joinedAt: new Date("2026-08-11"),
    },
  ];

  for (const userData of users) {
    const user = await prisma.user.upsert({
      where: {
        email: userData.email,
      },
      update: {
        name: userData.name,
        plan: userData.plan,
        status: userData.status,
        joinedAt: userData.joinedAt,
      },
      create: userData,
    });

    let subscriptionStatus = "Active";
    let price = 0;
    let endsAt: Date | null = null;

    if (userData.plan === "Pro") {
      price = 2900;
    }

    if (userData.plan === "Business") {
      price = 7900;
    }

    if (
      userData.email ===
      "daniel.smith@example.com"
    ) {
      subscriptionStatus = "Canceled";
      endsAt = new Date("2026-09-20");
    }

    if (
      userData.email ===
      "michael.wilson@example.com"
    ) {
      subscriptionStatus = "PastDue";
    }

    const subscription =
      await prisma.subscription.upsert({
        where: {
          userId: user.id,
        },
        update: {
          plan: userData.plan,
          status: subscriptionStatus,
          price,
          startedAt: userData.joinedAt,
          endsAt,
        },
        create: {
          userId: user.id,
          plan: userData.plan,
          status: subscriptionStatus,
          price,
          startedAt: userData.joinedAt,
          endsAt,
        },
      });

    await prisma.payment.deleteMany({
      where: {
        userId: user.id,
      },
    });

    const payments: {
      amount: number;
      status: string;
      method: string;
      paidAt: Date | null;
    }[] = [];

    if (
      userData.email ===
      "alex.johnson@example.com"
    ) {
      payments.push({
        amount: 2900,
        status: "Succeeded",
        method: "Card",
        paidAt: new Date(
          "2026-08-24T10:30:00"
        ),
      });
    }

    if (
      userData.email ===
      "maria.garcia@example.com"
    ) {
      payments.push({
        amount: 7900,
        status: "Succeeded",
        method: "Card",
        paidAt: new Date(
          "2026-08-22T14:10:00"
        ),
      });
    }

    if (
      userData.email ===
      "sophia.brown@example.com"
    ) {
      payments.push({
        amount: 2900,
        status: "Pending",
        method: "PayPal",
        paidAt: null,
      });
    }

    if (
      userData.email ===
      "michael.wilson@example.com"
    ) {
      payments.push({
        amount: 7900,
        status: "Failed",
        method: "Card",
        paidAt: null,
      });
    }

    if (
      userData.email ===
      "emma.davis@example.com"
    ) {
      payments.push({
        amount: 0,
        status: "Succeeded",
        method: "Card",
        paidAt: new Date(
          "2026-08-11T09:00:00"
        ),
      });
    }

    for (const payment of payments) {
      await prisma.payment.create({
        data: {
          userId: user.id,
          subscriptionId: subscription.id,
          amount: payment.amount,
          currency: "USD",
          status: payment.status,
          method: payment.method,
          paidAt: payment.paidAt,
        },
      });
    }
  }

  console.log(
    "Database seeded successfully."
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });