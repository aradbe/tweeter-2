import { useEffect, useRef } from "react";
import { useTweets } from "../context/TweetsContext";

function InfiniteScrollTrigger() {
  const triggerRef = useRef(null);
  const { loadMoreTweets, hasMore, isLoadingMore } = useTweets();

  useEffect(() => {
    const triggerElement = triggerRef.current;

    if (!triggerElement) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      const firstEntry = entries[0];

      if (firstEntry.isIntersecting && hasMore && !isLoadingMore) {
        loadMoreTweets();
      }
    });

    observer.observe(triggerElement);

    return () => observer.disconnect();
  }, [hasMore, isLoadingMore, loadMoreTweets]);

  return (
    <div ref={triggerRef} className="scroll-trigger">
      {isLoadingMore && <p>Loading more tweets...</p>}
      {!hasMore && <p>No more tweets.</p>}
    </div>
  );
}

export default InfiniteScrollTrigger;
