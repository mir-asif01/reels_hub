import { NextResponse } from "next/server";

export default async function POST() {
  NextResponse.json({ message: "Login page" });
}
