import { useSelector } from 'react-redux';
import { useGetSearchResultsQuery } from '../../api/redditApi';
import { Link } from 'react-router-dom';
import SkeletonLoader from '../../components/SkeletonLoader';
import useRetryCountdown from '../../hooks/useRetryCountdown';
import RenderThumbnail from '../../components/RenderThumbnail';

const SearchResults = () => {
  const searchTerm = useSelector((state) => state.search);

  const {
    data: searchResults,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch
  } = useGetSearchResultsQuery(searchTerm);

  const { countdown, retryAvailable, setRetryAvailable, progress } = useRetryCountdown();

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
          The server could not find what you are looking for, or it does not exist. Wait to retry,
          or change what is typed.
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
      {isLoading && Array.from({ length: 10 }).map((_, i) => <SkeletonLoader key={i} />)}

      {isSuccess && (
        <ul>
          {searchResults?.data.children.map((result) => {
            <li key={result.data.id}>
              <h3>{result.data.title}</h3>
              <RenderThumbnail post={result.data} />
              <p>
                Posted by <b>{result.data.author}</b> in <b>{result.data.subreddit}</b>
              </p>
              <p>
                <Link to={`/post/${encodeURIComponent(result.data.permalink)}`}>
                  {result.data.score} | {result.data.num_comments} comments
                </Link>
              </p>
            </li>;
          })}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
