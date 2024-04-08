import { Link } from 'react-router-dom';
import RenderThumbnail from '../../utils/RenderThumbnail';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import styles from './PostsFeed.module.css';

const PostsFeed = ({ posts }) => {
  return (
    <ul className={styles.feed}>
      {posts?.data.children.map((post) => (
        <li key={post.data.id} className={styles.post}>
          <Link to={`/post/${post.data.id}`} className={styles.link}>
            <h3 className={styles.title}>{post.data.title}</h3>
            <RenderThumbnail post={post.data} />
            <p className={styles.metadata}>
              Posted by <strong>u/{post.data.author}</strong> in{' '}
              <strong>r/{post.data.subreddit}</strong> -{' '}
              {formatDistanceToNow(new Date(post.data.created_utc * 1000), {
                addSuffix: true
              })}
            </p>
            <footer className={styles.footer}>
              <p className={styles.points}>
                {post.data.score} Points | Ratio: {post.data.upvote_ratio}
              </p>
              <p className={styles.comments}>{post.data.num_comments} Comments</p>
            </footer>
          </Link>
        </li>
      ))}
    </ul>
  );
};

PostsFeed.propTypes = {
  posts: PropTypes.shape({
    data: PropTypes.shape({
      children: PropTypes.arrayOf(
        PropTypes.shape({
          data: PropTypes.shape({
            id: PropTypes.string,
            title: PropTypes.string,
            thumbnail: PropTypes.string
          })
        })
      )
    })
  })
};

export default PostsFeed;
