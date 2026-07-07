import { useEffect, useState } from "react";
import CreateTweet from "../components/CreateTweet";
import TweetsList from "../components/TweetsList";
import { createTweet, getTweets } from "../lib/tweetsApi";

function HomePage({ userName }) {
  const [tweets, setTweets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState("");

  async function loadTweets() {
    try {
      setIsLoading(true);
      setError("");

      const tweetsFromServer = await getTweets();
      setTweets(tweetsFromServer);
    } catch (err) {
      setError(err.message);
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

      await createTweet(newTweet);

      await loadTweets();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsAdding(false);
    }
  }

  useEffect(() => {
    loadTweets();
  }, []);

  return (
    <main className="page">
      <h1>Tweeter 2.0</h1>

      <CreateTweet onAddTweet={addTweet} isAdding={isAdding} />

      {error && <p className="error server-error">{error}</p>}

      {isLoading ? (
        <p className="loading">Loading tweets...</p>
      ) : (
        <TweetsList tweets={tweets} />
      )}
    </main>
  );
}

export default HomePage;
