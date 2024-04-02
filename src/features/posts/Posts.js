import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { VariableSizeList as List } from 'react-window';
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

  const getItemSize = (index) => {
    const post = posts?.data?.children[index]?.data;
    if (post.thumbnail && !['self', 'default', 'image', 'nsfw'].includes(post.thumbnail)) {
      return 350; // Height with thumbnail
    }
    return 200; // Text only height
  };

  if (isError) {
    return (
      <div>
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

  const Row = ({ index, style }) => {
    const post = posts?.data?.children[index]?.data;
    return (
      <li style={style}>
        <h3>{post.title}</h3>
        <RenderThumbnail post={post} />
        <p>
          Posted by <b>{post.author}</b> in <b>{post.subreddit}</b>
        </p>
        <p>{formatDistanceToNow(post.created_utc * 1000)}</p>
        <p>
          <Link to={`/post/${encodeURIComponent(post.permalink)}`}>
            {post.score} | {post.num_comments} comments
          </Link>
        </p>
      </li>
    );
  };

  Row.propTypes = {
    index: PropTypes.number,
    style: PropTypes.object
  };

  return (
    <div>
      {isLoading &&
        Array.from({ length: 10 }).map((_, i) => (
          <SkeletonLoader key={i} data-testid={`skeleton-loader-${i}`} />
        ))}
      {isSuccess && (
        <List
          height={700}
          itemCount={posts?.data.children.length || 0}
          itemSize={getItemSize}
          width={'100%'}>
          {Row}
        </List>
      )}
    </div>
  );
};

export default Posts;
