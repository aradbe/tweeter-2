import { useState } from "react";

const MAX_CHARS = 140;

function CreateTweet({ onAddTweet, isAdding }) {
  const [content, setContent] = useState("");

  const isTooLong = content.length > MAX_CHARS;
  const isEmpty = content.trim() === "";

  function handleSubmit(e) {
    e.preventDefault();

    if (isTooLong || isEmpty || isAdding) {
      return;
    }

    onAddTweet(content);
    setContent("");
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
