import { NextRequest, NextResponse } from "next/server";
import generateSlug from "@/lib/url";
import { putURL } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "Invalid URL provided" },
        { status: 400 }
      );
    }

    let slug = generateSlug(6);
    let res = await putURL(slug, url);
    if (!res) {
      return NextResponse.json(
        { error: "Could not add to database" },
        { status: 500 }
      );
    }

    // Dynamic host resolution for Vercel/Deployment or fallback to BASE_URL env variable
    let origin = process.env.BASE_URL;
    if (!origin) {
      const host = req.headers.get("host") || "localhost:3000";
      const protocol = host.includes("localhost") ? "http" : "https";
      origin = `${protocol}://${host}`;
    }
    const formattedBaseUrl = origin.endsWith('/') ? origin : `${origin}/`;

    return NextResponse.json(
      { shortUrl: `${formattedBaseUrl}${slug}` },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Invalid JSON request body" },
      { status: 400 }
    );
  }
}