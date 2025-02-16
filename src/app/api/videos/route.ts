import { connectDb } from "@/libs/connectDb";
import { authOptions } from "@/libs/next-auth-options";
import { IVideo, Video } from "@/models/video.model";
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

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized user",
        },
        { status: 401 }
      );
    }
    await connectDb();
    const vid: IVideo = await req.json();
    if (
      !vid?.title ||
      !vid?.description ||
      !vid?.thumbnailUrl ||
      !vid?.videoUrl
    ) {
      return NextResponse.json(
        { success: false, message: "Missing video filed" },
        { status: 403 }
      );
    }
    const videoData: IVideo = {
      ...vid,
      controls: vid?.controls && true,
      tranformations: {
        height: 1920,
        width: 1080,
        quality: vid?.tranformations?.quality && 100,
      },
    };

    const result = await Video.create(videoData);
    return NextResponse.json(
      {
        success: true,
        message: `Video added successfully`,
        data: result,
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
