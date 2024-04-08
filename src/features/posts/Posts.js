import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useGetSubredditPostsQuery } from '../../api/redditApi';
import SkeletonLoader from '../../common/SkeletonLoader';
import useRetryCountdown from '../../utils/useRetryCountdown';
import PostsFeed from './PostsFeed';
import PostsError from './PostsError';
import styles from './Posts.module.css';

const Posts = () => {
  const subreddit = useSelector((state) => state.subreddit);
  const postsRef = useRef(null);

  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch
  } = useGetSubredditPostsQuery(subreddit);

  const { countdown, retryAvailable, setRetryAvailable, progress } = useRetryCountdown(isError);

  const handleRetry = () => {
    if (retryAvailable) {
      refetch();
      setRetryAvailable(false);
    }
  };

  if (isError) {
    return (
      <section className={styles.postsContainer}>
        <PostsError
          error={error}
          countdown={countdown}
          retryAvailable={retryAvailable}
          handleRetry={handleRetry}
          progress={progress}
        />
      </section>
    );
  }

  if (isSuccess) {
    postsRef.current?.focus();
  }

  return (
    <section className={styles.postsContainer}>
      <h2 tabIndex="-1" ref={postsRef} className={styles.hiddenButFocusable}>
        Posts
      </h2>
      {isLoading && (
        <div aria-live="polite">
          <SkeletonLoader />
        </div>
      )}
      {isSuccess && <PostsFeed posts={posts} />}
    </section>
  );
};

export default Posts;
