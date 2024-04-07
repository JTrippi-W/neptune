import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import TextWithMedia from './TextWithMedia';
import Replies from './Replies';
import RemovedComment from './RemovedComment';
import styles from './Comment.module.css';

const Comment = ({ comment }) => {
  const postDate = new Date(comment.created_utc * 1000);

  if (!comment.body && !comment.author) {
    return <RemovedComment comment={comment} />;
  }

  return (
    <article className={styles.comment}>
      {/* Render comment body while handling media URLs */}
      <section className={styles.commentBody}>
        <TextWithMedia text={comment.body} mediaMetadata={comment.media_metadata} />
      </section>
      <footer className={styles.commentFooter}>
        <p>
          Posted by <strong className={styles.strong}>u/{comment.author || '[deleted]'}</strong>{' '}
          {postDate && (
            <time dateTime={`${postDate.toISOString()}`} className={styles.time}>
              {formatDistanceToNow(postDate)} ago
            </time>
          )}
        </p>
      </footer>
      <Replies replies={comment.replies} />
    </article>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string,
    body: PropTypes.string,
    author: PropTypes.string,
    created_utc: PropTypes.number,
    media_metadata: PropTypes.object,
    replies: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        data: PropTypes.shape({
          children: PropTypes.arrayOf(
            PropTypes.shape({
              kind: PropTypes.string.isRequired,
              data: PropTypes.object.isRequired
            })
          ).isRequired
        }).isRequired
      }).isRequired
    ])
  }).isRequired
};

export default Comment;
