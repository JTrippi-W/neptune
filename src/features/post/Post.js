import { useParams } from 'react-router-dom';
import { useGetPostAndCommentsQuery } from '../../api/redditApi';
import Comments from '../comments/Comments';
import RenderMedia from '../../utils/RenderMedia';
import generateLinkBody from './generateLinkBody';
import { formatDistanceToNow } from 'date-fns';

const Post = () => {
  const { encodedPermalink } = useParams();
  const permalink = decodeURIComponent(encodedPermalink);
  const {
    data,
    isLoading: isPostLoading,
    isSuccess: isPostSuccess,
    isError: isPostError,
    error: postError
  } = useGetPostAndCommentsQuery(permalink);

  if (isPostLoading) return <div data-testid="post-loading">Loading...</div>;

  if (isPostError)
    return (
      <div data-testid="error-message">
        Error occurred: {postError?.data?.message || 'An unknown error has occurred'}
      </div>
    );

  const { post, comments } = data;

  // Determine if the post links to external content
  const hasExternalLink =
    !post.is_self && !post.is_video && /\.(jpeg|jpg|gif|png)$/.test(post.url) === false;

  return (
    <div>
      <section>
        <h2 data-testid="post-title">{post.title}</h2>
        <p>
          Posted by {post.author} in {post.subreddit}
        </p>
        <p>{formatDistanceToNow(post.created_utc * 1000)}</p>
        {/* Display image if it exists, or link to external content */}
        {hasExternalLink ? (
          <a href={post.url} target="_blank" rel="noopener noreferrer">
            {/* content like an article will not have a thumbnail */}
            {generateLinkBody(post)}
          </a>
        ) : (
          <RenderMedia post={post} />
        )}
        {post.selftext && <p>{post.selftext}</p>}
        {/* Display comments if they exist */}
        {isPostLoading && <div data-testid="comments-loading">Loading comments...</div>}
        {isPostSuccess && <Comments comments={comments} />}
      </section>
    </div>
  );
};

export default Post;
