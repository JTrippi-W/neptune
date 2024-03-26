import { useSelector } from 'react-redux';
import { useGetSubredditPostsQuery } from '../../api/redditApi';
import { Link } from 'react-router-dom';
import SkeletonLoader from '../../common/SkeletonLoader';
import useRetryCountdown from '../../utils/useRetryCountdown';
import RenderThumbnail from '../../utils/RenderThumbnail';
import { formatDistanceToNow } from 'date-fns';

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
      <div data-testid="error-message">
        <p>Error occurred: {error?.data?.message || 'An unknown error has occurred'}</p>
        <p>
          The server could not find the subreddit, or it does not exist. Wait to retry, or change
          what is typed.
        </p>
        <div>
          {!retryAvailable && (
            <div
              style={{ width: '100%', backgroundColor: '#ccc' }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuetext={`Retry available in ${countdown} seconds`}>
              <div
                style={{
                  width: `${progress}%`,
                  height: '20px',
                  backgroundColor: 'red'
                }}>
                {/* Visually hidden text for screen readers */}
                <span style={{ visibility: 'hidden' }}>Retry available in {countdown} seconds</span>
              </div>
            </div>
          )}
          {retryAvailable ? (
            <button onClick={handleRetry}>Retry</button>
          ) : (
            <span>Retry in {countdown} seconds</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      {isLoading &&
        Array.from({ length: 10 }).map((_, i) => (
          <SkeletonLoader key={i} data-testid={`skeleton-loader-${i}`} />
        ))}

      {isSuccess && (
        <ul>
          {posts?.data.children.map((post) => (
            <li key={post.data.id}>
              <h3>{post.data.title}</h3>
              {/* Render a thumbnail if the post has one */}
              <RenderThumbnail post={post.data} />
              <p>
                Posted by <b>{post.data.author}</b> in <b>{post.data.subreddit}</b>
              </p>
              <p>{formatDistanceToNow(post.data.created_utc * 1000)}</p>
              <p>
                <Link to={`/post/${encodeURIComponent(post.data.permalink)}`}>
                  {post.data.score} | {post.data.num_comments} comments
                </Link>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Posts;
