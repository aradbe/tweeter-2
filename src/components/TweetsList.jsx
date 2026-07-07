import TweetItem from "./TweetItem";

function TweetsList({ tweets }) {
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
