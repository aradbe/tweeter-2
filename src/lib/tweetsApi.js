import { supabase } from "./supabaseClient";

export async function getTweets() {
  const { data, error } = await supabase
    .from("Tweets")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
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
