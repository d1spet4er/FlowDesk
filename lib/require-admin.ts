import { NextResponse } from "next/server";

import { auth } from "../auth";

export async function requireAdmin() {
  const session = await auth();

  if (!session?.user) {
    return {
      session: null,
      error: NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      ),
    };
  }

  if (session.user.role !== "ADMIN") {
    return {
      session: null,
      error: NextResponse.json(
        {
          message: "Forbidden",
        },
        {
          status: 403,
        }
      ),
    };
  }

  return {
    session,
    error: null,
  };
}