import React from 'react';
import { useSelector } from 'react-redux';
import { useGetSubredditPostsQuery } from '../../api/redditApi';
import SkeletonLoader from '../../common/SkeletonLoader';
import useRetryCountdown from '../../utils/useRetryCountdown';
import PostsFeed from './PostsFeed';
import PostsError from './PostsError';

const Posts = () => {
  const subreddit = useSelector((state) => state.subreddit);

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
      <PostsError
        error={error}
        countdown={countdown}
        retryAvailable={retryAvailable}
        handleRetry={handleRetry}
        progress={progress}
      />
    );
  }

  return (
    <section>
      {isLoading && <SkeletonLoader />}
      {isSuccess && <PostsFeed posts={posts} />}
    </section>
  );
};

export default Posts;
