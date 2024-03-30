import Comment from '../comment/Comment';
import PropTypes from 'prop-types';
import NoCommentsYet from './NoCommentsYet';

const Comments = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return <NoCommentsYet />;
  }

  return (
    <div>
      <h3>Comments</h3>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      body: PropTypes.string,
      author: PropTypes.string,
      created_utc: PropTypes.number
    })
  ).isRequired
};

export default Comments;
