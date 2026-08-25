import { NextResponse } from "next/server";

import { prisma } from "../../../../lib/prisma";
import { requireAdmin } from "../../../../lib/require-admin";

import type {
  UserPlan,
  UserStatus,
} from "../../../../types/user";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

type UpdateUserBody = {
  name: string;
  email: string;
  plan: UserPlan;
  status: UserStatus;
};

export async function PUT(
  request: Request,
  context: RouteContext
) {
  const { error } = await requireAdmin();

  if (error) {
    return error;
  }

  try {
    const { id } = await context.params;

    const userId = Number(id);

    if (Number.isNaN(userId)) {
      return NextResponse.json(
        {
          message: "Invalid user id",
        },
        {
          status: 400,
        }
      );
    }

    const body =
      (await request.json()) as UpdateUserBody;

    const existingUser =
      await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

    if (!existingUser) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    const emailOwner =
      await prisma.user.findUnique({
        where: {
          email: body.email.trim(),
        },
      });

    if (
      emailOwner &&
      emailOwner.id !== userId
    ) {
      return NextResponse.json(
        {
          message: "Email is already in use",
        },
        {
          status: 409,
        }
      );
    }

    const updatedUser =
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name: body.name.trim(),
          email: body.email.trim(),
          plan: body.plan,
          status: body.status,
        },
      });

    return NextResponse.json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      plan: updatedUser.plan,
      status: updatedUser.status,
      joinedAt:
        updatedUser.joinedAt.toLocaleDateString(
          "en-US",
          {
            month: "short",
            day: "numeric",
            year: "numeric",
          }
        ),
    });
  } catch {
    return NextResponse.json(
      {
        message: "Failed to update user",
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  _request: Request,
  context: RouteContext
) {
  const { error } = await requireAdmin();

  if (error) {
    return error;
  }

  try {
    const { id } = await context.params;

    const userId = Number(id);

    if (Number.isNaN(userId)) {
      return NextResponse.json(
        {
          message: "Invalid user id",
        },
        {
          status: 400,
        }
      );
    }

    const existingUser =
      await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

    if (!existingUser) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch {
    return NextResponse.json(
      {
        message: "Failed to delete user",
      },
      {
        status: 500,
      }
    );
  }
}