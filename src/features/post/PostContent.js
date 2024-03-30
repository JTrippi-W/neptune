import PropTypes from 'prop-types';
import RenderMedia from '../../utils/RenderMedia';
import generateLinkBody from './generateLinkBody';
import { formatDistanceToNow } from 'date-fns';

const PostContent = ({ post }) => {
  const hasExternalLink =
    !post.is_self && !post.is_video && !/\.(jpeg|jpg|gif|png)$/.test(post.url);

  return (
    <section>
      <h2 data-testid="post-title">{post.title}</h2>
      <p>
        Posted by {post.author} in {post.subreddit}
      </p>
      <p>{formatDistanceToNow(post.created_utc * 1000)}</p>
      {/* Display image or video if it exists, or link to other content */}
      {hasExternalLink ? (
        <a href={post.url} target="_blank" rel="noopener noreferrer">
          {generateLinkBody(post)}
        </a>
      ) : (
        <RenderMedia post={post} />
      )}
      {post.selftext && <p>{post.selftext}</p>}
    </section>
  );
};

PostContent.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    subreddit: PropTypes.string.isRequired,
    created_utc: PropTypes.number.isRequired,
    is_self: PropTypes.bool.isRequired,
    is_video: PropTypes.bool.isRequired,
    url: PropTypes.string.isRequired,
    selftext: PropTypes.string
  }).isRequired
};

export default PostContent;
