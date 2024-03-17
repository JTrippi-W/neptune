import { safeFormatDistanceToNow } from '../../utils/safeFormatDistanceToNow';
import PropTypes from 'prop-types';

const Comment = ({ comment }) => {
  return (
    <div key={comment.id}>
      <p>{comment.body}</p>
      <p>Posted by {comment.author}</p>
      <p>{safeFormatDistanceToNow(comment?.created_utc)} ago</p>
    </div>
  );
};

export default Comment;

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    created_utc: PropTypes.number.isRequired
  }).isRequired
};
