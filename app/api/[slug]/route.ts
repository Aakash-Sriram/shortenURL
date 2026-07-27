import { NextRequest, NextResponse } from "next/server";
import { getURL } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  if (!slug) {
    return NextResponse.json({ error: "Empty slug" }, { status: 400 });
  }

  const res = await getURL(slug);
  if (!res || !res.url) {
    return NextResponse.json({ error: "URL doesn't exist" }, { status: 404 });
  }

  let targetUrl = res.url;
  if (!/^https?:\/\//i.test(targetUrl)) {
    targetUrl = `https://${targetUrl}`;
  }

  return NextResponse.redirect(targetUrl, 307);
}