function TweetItem({ tweet }) {
  const date = new Date(tweet.date).toLocaleString();

  return (
    <div className="tweet">
      <div className="tweet-header">
        <strong>@{tweet.userName}</strong>
        <span>{date}</span>
      </div>

      <p>{tweet.content}</p>
    </div>
  );
}

export default TweetItem;
