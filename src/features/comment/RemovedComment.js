import PropTypes from 'prop-types';
import Replies from './Replies';

const RemovedComment = ({ comment }) => {
  return (
    <div>
      <p>[removed]</p>
      <p>
        Posted by <b>[deleted]</b>
      </p>
      <Replies replies={comment.replies} />
    </div>
  );
};

RemovedComment.propTypes = {
  comment: PropTypes.shape({
    replies: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        data: PropTypes.shape({
          children: PropTypes.arrayOf(PropTypes.object)
        })
      })
    ])
  })
};

export default RemovedComment;
