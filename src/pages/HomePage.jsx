import { useState } from "react";
import CreateTweet from "../components/CreateTweet";
import TweetsList from "../components/TweetsList";
import { getTweetsFromStorage, saveTweetsToStorage } from "../lib/storage";

const USER_NAME = "Arad";

function HomePage() {
  const [tweets, setTweets] = useState(() => {
    const savedTweets = getTweetsFromStorage();

    return savedTweets.sort((a, b) => new Date(b.date) - new Date(a.date));
  });

  function addTweet(content) {
    const newTweet = {
      id: Date.now(),
      content,
      userName: USER_NAME,
      date: new Date().toISOString(),
    };

    const updatedTweets = [newTweet, ...tweets];

    setTweets(updatedTweets);
    saveTweetsToStorage(updatedTweets);
  }

  return (
    <main className="page">
      <h1>Tweeter 2.0</h1>

      <CreateTweet onAddTweet={addTweet} />

      <TweetsList tweets={tweets} />
    </main>
  );
}

export default HomePage;
