import PropTypes from 'prop-types';
import styles from './ErrorLoadingPost.module.css';

const ErrorLoadingPost = ({ errorMessage }) => {
  return (
    <div role="alert" className={styles.errorContainer}>
      <h2 className={styles.errorTitle}>Oops! Something went wrong...</h2>
      <p className={styles.suggestion}>
        There was an issue loading the post right now. Here&apos;s why:
      </p>
      <blockquote className={styles.errorMessage}>
        {errorMessage || 'An unkown error has occurred.'}
      </blockquote>
      <p className={styles.suggestion}>Try refreshing the page, or check back later.</p>
    </div>
  );
};

ErrorLoadingPost.propTypes = {
  errorMessage: PropTypes.string
};

export default ErrorLoadingPost;
