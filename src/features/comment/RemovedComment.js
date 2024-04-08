import PropTypes from 'prop-types';
import Replies from './Replies';
import styles from './RemovedComment.module.css';

const RemovedComment = ({ comment }) => {
  return (
    <section className={styles.removedCommentSection}>
      <p className={styles.removedText}>[removed]</p>
      <p className={styles.postedBy}>
        Posted by <b className={styles.bold}>[deleted]</b>
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
