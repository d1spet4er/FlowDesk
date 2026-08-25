import { NextResponse } from "next/server";

import { prisma } from "../../../lib/prisma";
import { requireAdmin } from "../../../lib/require-admin";

import type {
  UserPlan,
  UserStatus,
} from "../../../types/user";

type CreateUserBody = {
  name: string;
  email: string;
  plan: UserPlan;
  status: UserStatus;
};

export async function GET() {
  const { error } = await requireAdmin();

  if (error) {
    return error;
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedUsers = users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      plan: user.plan as UserPlan,
      status: user.status as UserStatus,
      joinedAt: user.joinedAt.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    }));

    return NextResponse.json(formattedUsers);
  } catch {
    return NextResponse.json(
      {
        message: "Failed to load users",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: Request) {
  const { error } = await requireAdmin();

  if (error) {
    return error;
  }

  try {
    const body =
      (await request.json()) as CreateUserBody;

    if (!body.name?.trim()) {
      return NextResponse.json(
        {
          message: "Name is required",
        },
        {
          status: 400,
        }
      );
    }

    if (!body.email?.trim()) {
      return NextResponse.json(
        {
          message: "Email is required",
        },
        {
          status: 400,
        }
      );
    }

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email: body.email.trim(),
        },
      });

    if (existingUser) {
      return NextResponse.json(
        {
          message: "Email is already in use",
        },
        {
          status: 409,
        }
      );
    }

    const createdUser =
      await prisma.user.create({
        data: {
          name: body.name.trim(),
          email: body.email.trim(),
          plan: body.plan,
          status: body.status,
        },
      });

    return NextResponse.json(
      {
        id: createdUser.id,
        name: createdUser.name,
        email: createdUser.email,
        plan: createdUser.plan,
        status: createdUser.status,
        joinedAt:
          createdUser.joinedAt.toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "numeric",
              year: "numeric",
            }
          ),
      },
      {
        status: 201,
      }
    );
  } catch {
    return NextResponse.json(
      {
        message: "Failed to create user",
      },
      {
        status: 500,
      }
    );
  }
}