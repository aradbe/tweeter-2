import TweetItem from "./TweetItem";
import { useTweets } from "../context/TweetsContext";

function TweetsList() {
  const { tweets } = useTweets();

  if (!tweets || tweets.length === 0) {
    return <p className="empty-message">No tweets yet.</p>;
  }

  return (
    <div className="tweets-list">
      {tweets.map((tweet) => (
        <TweetItem key={tweet.id || tweet.date} tweet={tweet} />
      ))}
    </div>
  );
}

export default TweetsList;
