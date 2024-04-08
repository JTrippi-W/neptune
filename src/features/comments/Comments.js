import Comment from '../comment/Comment';
import PropTypes from 'prop-types';
import NoCommentsYet from './NoCommentsYet';
import styles from './Comments.module.css';

const Comments = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return <NoCommentsYet />;
  }

  return (
    <section aria-label="Comments">
      <ul className={styles.commentsList}>
        {comments.map((comment) => (
          <li key={comment.id} className={styles.commentItem}>
            <Comment key={comment.id} comment={comment} />
          </li>
        ))}
      </ul>
    </section>
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
