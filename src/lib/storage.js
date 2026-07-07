const TWEETS_KEY = "tweets";

export function getTweetsFromStorage() {
  const tweets = localStorage.getItem(TWEETS_KEY);

  if (!tweets) {
    return [];
  }

  return JSON.parse(tweets);
}

export function saveTweetsToStorage(tweets) {
  localStorage.setItem(TWEETS_KEY, JSON.stringify(tweets));
}
