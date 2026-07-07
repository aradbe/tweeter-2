import CreateTweet from "../components/CreateTweet";
import TweetsList from "../components/TweetsList";
import { useTweets } from "../context/TweetsContext";

function HomePage() {
  const { isLoading, error } = useTweets();

  return (
    <main className="page">
      <h1>Tweeter 2.0</h1>

      <CreateTweet />

      {error && <p className="error server-error">{error}</p>}

      {isLoading ? (
        <p className="loading">Loading tweets...</p>
      ) : (
        <TweetsList />
      )}
    </main>
  );
}

export default HomePage;
