import PropTypes from 'prop-types';
import Comment from './Comment';

const Replies = ({ replies, level = 1 }) => {
  if (!replies || typeof replies === 'string' || replies.length === 0) {
    return null;
  }

  const repliesData = replies.data?.children || [];

  return (
    <ul style={{ marginLeft: '1rem' }}>
      {repliesData.map((reply, index) => {
        // Skip types that don't contain a comment
        if (reply.kind === 'more') {
          return null;
        }
        return (
          <li key={reply.id || index}>
            <Comment key={reply.id} comment={reply.data} level={level + 1} />
          </li>
        );
      })}
    </ul>
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
  ]),
  level: PropTypes.number
};

export default Replies;
