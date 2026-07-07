import { createContext, useContext, useEffect, useState } from "react";
import { createTweet, getTweets } from "../lib/tweetsApi";

const TweetsContext = createContext();

const PAGE_SIZE = 10;

function sortTweetsByDate(tweets) {
  return [...tweets].sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function TweetsProvider({ children, userName }) {
  const [tweets, setTweets] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const [error, setError] = useState("");

  async function loadFirstTweets() {
    try {
      setIsLoading(true);
      setError("");

      const result = await getTweets(0, PAGE_SIZE);

      setTweets(sortTweetsByDate(result.tweets));
      setHasMore(result.hasMore);
      setPage(0);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function loadMoreTweets() {
    if (isLoadingMore || !hasMore) {
      return;
    }

    try {
      setIsLoadingMore(true);
      setError("");

      const nextPage = page + 1;
      const result = await getTweets(nextPage, PAGE_SIZE);

      setTweets((currentTweets) =>
        sortTweetsByDate([...currentTweets, ...result.tweets]),
      );

      setHasMore(result.hasMore);
      setPage(nextPage);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoadingMore(false);
    }
  }

  async function refreshLoadedTweets() {
    try {
      setError("");

      const loadedAmount = Math.max(tweets.length, PAGE_SIZE);

      const result = await getTweets(0, loadedAmount);

      setTweets(sortTweetsByDate(result.tweets));
      setHasMore(result.hasMore);
    } catch (err) {
      setError(err.message);
    }
  }

  async function addTweet(content) {
    try {
      setIsAdding(true);
      setError("");

      const newTweet = {
        content,
        userName,
        date: new Date().toISOString(),
      };

      const savedTweet = await createTweet(newTweet);

      setTweets((currentTweets) =>
        sortTweetsByDate([savedTweet, ...currentTweets]),
      );

      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setIsAdding(false);
    }
  }

  useEffect(() => {
    loadFirstTweets();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      refreshLoadedTweets();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [tweets.length]);

  const value = {
    tweets,
    isLoading,
    isAdding,
    isLoadingMore,
    hasMore,
    error,
    addTweet,
    loadMoreTweets,
  };

  return (
    <TweetsContext.Provider value={value}>{children}</TweetsContext.Provider>
  );
}

export function useTweets() {
  const context = useContext(TweetsContext);

  if (!context) {
    throw new Error("useTweets must be used inside TweetsProvider");
  }

  return context;
}
