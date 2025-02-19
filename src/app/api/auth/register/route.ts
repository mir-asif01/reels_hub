import { connectDb } from "@/lib/connectDb";
import { User } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    console.log(email, password);
    await connectDb();
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email/Password not found",
        },
        { status: 402 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 403 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 9);
    await User.create({ email, password: hashedPassword });
    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to register user",
      },
      { status: 500 }
    );
  }
}
