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

    const base_url = process.env.BASE_URL || "http://localhost:3000/";
    const formattedBaseUrl = base_url.endsWith('/') ? base_url : `${base_url}/`;
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