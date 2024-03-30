import PropTypes from 'prop-types';

const ErrorLoadingPost = ({ errorMessage }) => {
  return (
    <div data-testid="error-message">
      <h2>Oops! Something went wrong...</h2>
      <p>There was an issue loading the post right now. Here&apos;s why:</p>
      <blockquote>{errorMessage || 'An unkown error has occurred.'}</blockquote>
      <p>Try refreshing the page, or check back later.</p>
    </div>
  );
};

ErrorLoadingPost.propTypes = {
  errorMessage: PropTypes.string
};

export default ErrorLoadingPost;
