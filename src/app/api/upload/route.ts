import { connectDb } from "@/lib/connectDb";
import { authOptions } from "@/lib/next-auth-options";
import { TImage, Image } from "@/models/image.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

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
    const vid: TImage = await req.json();
    console.log(vid);
    if (
      !vid?.title ||
      !vid?.description ||
      !vid?.thumbnailUrl ||
      !vid?.imageUrl
    ) {
      return NextResponse.json(
        { success: false, message: "Missing video file" },
        { status: 403 }
      );
    }
    const imageData: TImage = {
      ...vid,
      controls: vid?.controls && true,
      tranformations: {
        height: 1920,
        width: 1080,
        quality: vid?.tranformations?.quality && 100,
      },
    };

    const result = await Image.create(imageData);
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
