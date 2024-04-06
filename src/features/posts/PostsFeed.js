import { Link } from 'react-router-dom';
import RenderThumbnail from '../../utils/RenderThumbnail';
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

const PostsFeed = ({ posts }) => {
  return (
    <ul>
      {posts?.data.children.map((post) => (
        <li key={post.data.id}>
          <Link to={`/post/${post.data.id}`}>
            <h3>{post.data.title}</h3>
            <RenderThumbnail post={post.data} />
            <p>
              Posted by <strong>u/{post.data.author}</strong> in{' '}
              <strong>{post.data.subreddit}</strong> -{' '}
              {formatDistanceToNow(new Date(post.data.created_utc * 1000), {
                addSuffix: true
              })}
            </p>
            <p>
              {post.data.score} | {post.data.num_comments} comments
            </p>
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
