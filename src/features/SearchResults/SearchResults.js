import { useSelector } from 'react-redux';
import { useGetSearchResultsQuery } from '../../api/redditApi';
import SkeletonLoader from '../../common/SkeletonLoader';
import useRetryCountdown from '../../utils/useRetryCountdown';
import SearchResultItem from './SearchResultItem';

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
          {searchResults?.data.children.map((result) => (
            <li key={result.data.id}>
              <SearchResultItem item={result} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchResults;
