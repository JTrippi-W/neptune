import { useParams } from 'react-router-dom';
import { useGetPostAndCommentsQuery } from '../../api/redditApi';
import { safeFormatDistanceToNow } from '../../utils/safeFormatDistanceToNow';
import Comments from '../comments/Comments';
import RenderMedia from '../../utils/RenderMedia';

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

  if (isPostLoading || !data.post) return <div data-testid="post-loading">Loading...</div>;
  if (isPostError)
    return (
      <div data-testid="error-message">
        Error occurred: {postError.message || 'An unknown error has occurred'}
      </div>
    );

  const { post, comments } = data;
  return (
    <div>
      <section>
        <h2 data-testid="post-title">{post.title}</h2>
        <p>
          Posted by {post.author} in {post.subreddit}
        </p>
        <p>{safeFormatDistanceToNow(post?.created_utc)} ago</p>
        {/* Display image if it exists */}
        <RenderMedia post={post} />
        {post.selftext && <p>{post.selftext}</p>}
        {/* Display comments if they exist */}
        {isPostLoading && <div data-testid="comments-loading">Loading comments...</div>}
        {isPostSuccess && <Comments comments={comments} />}
      </section>
    </div>
  );
};

export default Post;
