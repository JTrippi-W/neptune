import PropTypes from 'prop-types';
import Replies from './Replies';

const RemovedComment = ({ comment }) => {
  return (
    <section>
      <p>[removed]</p>
      <p>
        Posted by <b>[deleted]</b>
      </p>
      <Replies replies={comment.replies} />
    </section>
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
