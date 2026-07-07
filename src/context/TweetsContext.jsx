import { createContext, useContext, useEffect, useState } from "react";
import { createTweet, getTweets } from "../lib/tweetsApi";

const TweetsContext = createContext();

function sortTweetsByDate(tweets) {
  return [...tweets].sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function TweetsProvider({ children, userName }) {
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState("");

  async function loadTweets() {
    try {
      setError("");

      const tweetsFromServer = await getTweets();
      setTweets(sortTweetsByDate(tweetsFromServer));
    } catch (err) {
      setError(err.message);
    }
  }

  async function firstLoadTweets() {
    try {
      setIsLoading(true);
      await loadTweets();
    } finally {
      setIsLoading(false);
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
    firstLoadTweets();

    const intervalId = setInterval(() => {
      loadTweets();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const value = {
    tweets,
    isLoading,
    isAdding,
    error,
    addTweet,
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
