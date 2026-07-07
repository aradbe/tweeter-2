const API_URL = "http://localhost:3001/Tweets";

export async function getTweets() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to load tweets");
  }

  const tweets = await response.json();

  return tweets.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function createTweet(tweet) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tweet),
  });

  if (!response.ok) {
    throw new Error("Failed to create tweet");
  }

  const newTweet = await response.json();

  return newTweet;
}
