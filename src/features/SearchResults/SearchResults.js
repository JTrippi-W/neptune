import { useSelector } from 'react-redux';
import { useGetSearchResultsQuery } from '../../api/redditApi';
import SkeletonLoader from '../../common/SkeletonLoader';
import useRetryCountdown from '../../utils/useRetryCountdown';
import SearchResultItem from './SearchResultItem';
import PostsError from '../posts/PostsError';
import styles from './SearchResults.module.css';

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

  if (isLoading) return <SkeletonLoader />;
  if (isError)
    return (
      <PostsError
        error={error}
        countdown={countdown}
        retryAvailable={retryAvailable}
        handleRetry={handleRetry}
        progress={progress}
      />
    );

  return (
    <section className={styles.resultsContainer}>
      {isSuccess && (
        <ul className={styles.list}>
          {searchResults?.data.children.map((result) => (
            <li key={result.data.id}>
              <SearchResultItem item={result} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default SearchResults;
