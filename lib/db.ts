import supabase from "@/db/supabaseclient";
import { getCache } from "@vercel/functions";

export const getURL = async (slug: string) => {
  const cache = getCache();
  const key = `url:${slug}`;

  let cachedUrl = (await cache.get(key)) as string | null;
  if (cachedUrl) {
    return { url: cachedUrl };
  }

  const { data, error } = await supabase
    .from("urls")
    .select("url")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    console.error("Error getting URL: ", error);
    return null;
  }

  await cache.set(key, data.url, {
    ttl: 60 * 60, // 1 hour TTL
  });

  return data;
};

export const putURL = async (slug: string, url: string): Promise<boolean> => {
  const { error } = await supabase.from("urls").insert({
    slug: slug,
    url: url,
  });
  if (error) {
    console.error("Error inserting URL: ", JSON.stringify(error, null, 2));
    return false;
  }
  return true;
};

