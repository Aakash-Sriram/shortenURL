import supabase from "@/db/supabaseclient";

export const getURL = async (slug: string) => {
  const { data, error } = await supabase.from("urls").select("url").eq("slug", slug).single();
  if (error) {
    console.error("Error getting URL: ", error);
    return null;
  }
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
