import { useState } from "react";
import { useTweets } from "../context/TweetsContext";

const MAX_CHARS = 140;

function CreateTweet() {
  const [content, setContent] = useState("");
  const { addTweet, isAdding } = useTweets();

  const isTooLong = content.length > MAX_CHARS;
  const isEmpty = content.trim() === "";

  async function handleSubmit(e) {
    e.preventDefault();

    if (isTooLong || isEmpty || isAdding) {
      return;
    }

    const wasAdded = await addTweet(content);

    if (wasAdded) {
      setContent("");
    }
  }

  return (
    <form className="create-tweet" onSubmit={handleSubmit}>
      <textarea
        placeholder="What are you thinking about?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={isAdding}
      />

      <div className="tweet-form-bottom">
        <span className={isTooLong ? "char-count error" : "char-count"}>
          {content.length}/{MAX_CHARS}
        </span>

        <button disabled={isTooLong || isEmpty || isAdding}>
          {isAdding ? "Posting..." : "Tweet"}
        </button>
      </div>

      {isTooLong && (
        <p className="error">Tweet cannot be more than 140 characters.</p>
      )}
    </form>
  );
}

export default CreateTweet;
