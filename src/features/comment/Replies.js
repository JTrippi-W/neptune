import PropTypes from 'prop-types';
import Comment from './Comment';

const Replies = ({ replies }) => {
  if (!replies || typeof replies === 'string' || replies.length === 0) {
    return null;
  }

  const repliesData = replies.data?.children || [];

  return (
    <div style={{ marginLeft: '1rem' }}>
      {repliesData.map((reply, index) => {
        // Skip types that don't contain a comment
        if (reply.kind === 'more') {
          return null;
        }
        return <Comment key={index} comment={reply.data} />;
      })}
    </div>
  );
};

Replies.propTypes = {
  replies: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      data: PropTypes.shape({
        children: PropTypes.arrayOf(PropTypes.object)
      })
    })
  ])
};

export default Replies;
