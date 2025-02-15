import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
  privateKey: process.env.PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
});

export async function GET() {
  try {
    return NextResponse.json(imagekit.getAuthenticationParameters());
    // return NextResponse.json({ message: "imgkit-auth route" });
  } catch (error) {
    console.log("Error while connecting imgkit : ", error);
    return NextResponse.json(
      { message: "Error while connecting imgkit" },
      { status: 500 }
    );
  }
}
