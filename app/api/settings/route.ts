import { NextResponse } from "next/server";

import { auth } from "../../../auth";
import { prisma } from "../../../lib/prisma";

import type { AdminSettings } from "../../../types/settings";

function getAdminId(sessionUserId: string | undefined) {
  if (!sessionUserId) {
    return null;
  }

  const adminId = Number(sessionUserId);

  if (!Number.isInteger(adminId) || adminId <= 0) {
    return null;
  }

  return adminId;
}

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        {
          message: "Forbidden",
        },
        {
          status: 403,
        }
      );
    }

    const adminId = getAdminId(session.user.id);

    if (!adminId) {
      return NextResponse.json(
        {
          message: "Invalid admin session",
        },
        {
          status: 401,
        }
      );
    }

    const admin = await prisma.admin.findUnique({
      where: {
        id: adminId,
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

    if (!session?.user) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        {
          message: "Forbidden",
        },
        {
          status: 403,
        }
      );
    }

    const adminId = getAdminId(session.user.id);

    if (!adminId) {
      return NextResponse.json(
        {
          message: "Invalid admin session",
        },
        {
          status: 401,
        }
      );
    }

    const body = (await request.json()) as AdminSettings;

    const name = body.name?.trim();
    const email = body.email?.trim().toLowerCase();
    const companyName = body.companyName?.trim();
    const timezone = body.timezone?.trim();

    if (!name) {
      return NextResponse.json(
        {
          message: "Name is required",
        },
        {
          status: 400,
        }
      );
    }

    if (!email) {
      return NextResponse.json(
        {
          message: "Email is required",
        },
        {
          status: 400,
        }
      );
    }

    if (!companyName) {
      return NextResponse.json(
        {
          message: "Company name is required",
        },
        {
          status: 400,
        }
      );
    }

    if (!timezone) {
      return NextResponse.json(
        {
          message: "Timezone is required",
        },
        {
          status: 400,
        }
      );
    }

    const existingAdmin = await prisma.admin.findUnique({
      where: {
        id: adminId,
      },
    });

    if (!existingAdmin) {
      return NextResponse.json(
        {
          message: "Admin not found",
        },
        {
          status: 404,
        }
      );
    }

    const emailOwner = await prisma.admin.findUnique({
      where: {
        email,
      },
    });

    if (emailOwner && emailOwner.id !== adminId) {
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
        id: adminId,
      },
      data: {
        name,
        email,
        timezone,
        companyName,
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