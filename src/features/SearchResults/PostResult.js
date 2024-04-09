import { Link } from 'react-router-dom';
import RenderThumbnail from '../../utils/RenderThumbnail';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import styles from './PostResult.module.css';

const PostResult = ({ post }) => {
  return (
    <article className={styles.post}>
      <Link
        to={`/post/${encodeURIComponent(post.permalink)}`}
        aria-label={`View post: ${post.title}`}
        className={styles.link}>
        <h3 className={styles.title}>{post.title}</h3>
        <RenderThumbnail post={post} />
        <p className={styles.metadata}>
          Posted by <strong>u/{post.author}</strong> in <strong>r/{post.subreddit}</strong>
          {formatDistanceToNow(new Date(post.created_utc * 1000), {
            addSuffix: true
          })}
        </p>
        <footer className={styles.footer}>
          <p className={styles.points}>
            {post.score} Points | Ratio: {post.upvote_ratio}
          </p>
          <p className={styles.comments}>{post.num_comments} Comments</p>
        </footer>
      </Link>
    </article>
  );
};

PostResult.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    permalink: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    subreddit: PropTypes.string,
    score: PropTypes.number,
    num_comments: PropTypes.number,
    created_utc: PropTypes.number,
    upvote_ratio: PropTypes.number
  }).isRequired
};

export default PostResult;
