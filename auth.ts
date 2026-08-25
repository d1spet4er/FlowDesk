import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";

import { prisma } from "./lib/prisma";

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },

        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        const email =
          typeof credentials.email ===
          "string"
            ? credentials.email
                .trim()
                .toLowerCase()
            : "";

        const password =
          typeof credentials.password ===
          "string"
            ? credentials.password
            : "";

        if (!email || !password) {
          return null;
        }

        const admin =
          await prisma.admin.findUnique({
            where: {
              email,
            },
          });

        if (!admin) {
          return null;
        }

        const passwordMatches =
          await bcrypt.compare(
            password,
            admin.passwordHash
          );

        if (!passwordMatches) {
          return null;
        }

        return {
          id: String(admin.id),
          name: admin.name,
          email: admin.email,
          role: admin.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }

      return token;
    },

    async session({
      session,
      token,
    }) {
      if (session.user) {
        session.user.id =
          token.sub ?? "";

        session.user.role =
          token.role as string;
      }

      return session;
    },
  },
});