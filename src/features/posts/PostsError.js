import PropTypes from 'prop-types';

const PostsError = ({ error, countdown, retryAvailable, handleRetry, progress }) => {
  return (
    <div data-testid="error-message">
      <p>Error occurred: {error?.data?.message || 'An unknown error has occurred'}</p>
      <p>
        The server could not find what you are looking for, or it does not exist. Wait to retry, or
        change what is typed.
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
};

PostsError.propTypes = {
  error: PropTypes.shape({
    data: PropTypes.shape({
      message: PropTypes.string
    })
  }),
  countdown: PropTypes.number,
  retryAvailable: PropTypes.bool,
  handleRetry: PropTypes.func,
  progress: PropTypes.number
};

export default PostsError;
