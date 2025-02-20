import { connectDb } from "@/lib/connectDb";
import { authOptions } from "@/lib/next-auth-options";
import { IVideo, Video } from "@/models/image.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();
    const videos = (await Video.find().sort({ createdAt: -1 }).lean()) as any;
    if (!videos || videos?.length === 0) {
      return NextResponse.json(
        { success: true, message: "0 videos found", data: videos },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: `${videos?.length} number of videos found`,
        data: videos,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message },
      { status: 500 }
    );
  }
}
