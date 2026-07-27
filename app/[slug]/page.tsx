import { redirect, notFound } from "next/navigation";
import { getURL } from "@/lib/db";

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getURL(slug);

  if (!data) {
    notFound();
  }

  redirect(data.url);
}
