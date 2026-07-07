import { supabase } from "./supabaseClient";

export async function getTweets(page = 0, limit = 10) {
  const from = page * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("Tweets")
    .select("*", { count: "exact" })
    .order("date", { ascending: false })
    .range(from, to);

  if (error) {
    throw new Error(error.message);
  }

  return {
    tweets: data,
    hasMore: to + 1 < count,
  };
}

export async function createTweet(tweet) {
  const { data, error } = await supabase
    .from("Tweets")
    .insert([tweet])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
}
