import { NextResponse } from "next/server";

import { auth } from "../../../auth";
import { prisma } from "../../../lib/prisma";

import type { AdminSettings } from "../../../types/settings";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const admin = await prisma.admin.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!admin) {
      return NextResponse.json(
        {
          message: "Admin not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      name: admin.name,
      email: admin.email,
      timezone: admin.timezone,
      companyName: admin.companyName,
    });
  } catch {
    return NextResponse.json(
      {
        message: "Failed to load settings",
      },
      {
        status: 500,
      }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const body = (await request.json()) as AdminSettings;

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

    if (!body.companyName?.trim()) {
      return NextResponse.json(
        {
          message: "Company name is required",
        },
        {
          status: 400,
        }
      );
    }

    const emailOwner = await prisma.admin.findUnique({
      where: {
        email: body.email.trim().toLowerCase(),
      },
    });

    if (
      emailOwner &&
      emailOwner.email !== session.user.email
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

    const updatedAdmin = await prisma.admin.update({
      where: {
        email: session.user.email,
      },

      data: {
        name: body.name.trim(),
        email: body.email.trim().toLowerCase(),
        timezone: body.timezone,
        companyName: body.companyName.trim(),
      },
    });

    return NextResponse.json({
      name: updatedAdmin.name,
      email: updatedAdmin.email,
      timezone: updatedAdmin.timezone,
      companyName: updatedAdmin.companyName,
    });
  } catch {
    return NextResponse.json(
      {
        message: "Failed to save settings",
      },
      {
        status: 500,
      }
    );
  }
}