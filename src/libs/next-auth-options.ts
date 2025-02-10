import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDb } from "./connectDb";
import { User } from "@/models/user.model";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Enter your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || credentials?.password) {
          throw new Error("Missing email or password");
        }
        try {
          await connectDb();
          const user = await User.findOne({ email: credentials?.email });
          if (!user) {
            throw new Error("No user with this email");
          }
          const isPasswordMatched = await bcrypt.compare(
            credentials.password,
            user?.password
          );
          if (!isPasswordMatched) {
            throw new Error("Incorrect password");
          }

          return {
            id: user._id.toString(),
            email: user.email,
          };
        } catch (error: any) {
          throw new Error("Auth error", error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 15,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
