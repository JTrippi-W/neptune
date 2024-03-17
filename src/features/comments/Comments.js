import Comment from '../comment/Comment';
import PropTypes from 'prop-types';

const Comments = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return <p>No comments yet.</p>;
  }

  return (
    <div data-testid="post-comments">
      <h3>Comments</h3>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default Comments;

Comments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      created_utc: PropTypes.number.isRequired
    })
  ).isRequired
};
