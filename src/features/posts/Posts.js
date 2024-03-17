import { useGetPopularPostsQuery } from '../../api/redditApi';
import { Link } from 'react-router-dom';
import SkeletonLoader from '../../common/SkeletonLoader';

export const Posts = () => {
  const { data: posts, isLoading, isSuccess, isError, error } = useGetPopularPostsQuery();

  if (isError)
    return (
      <div data-testid="error-message">
        Error occurred: {error.message || 'An unknown error has occurred'}
      </div>
    );

  return (
    <div>
      <h1>Popular Posts</h1>

      {isLoading &&
        Array.from({ length: 10 }).map((_, i) => (
          <SkeletonLoader key={i} data-testid={`skeleton-loader-${i}`} />
        ))}

      {isSuccess && (
        <ul>
          {posts?.data.children.map((post) => (
            <li key={post.data.id}>
              <h3>{post.data.title}</h3>
              <p>
                Posted by <b>{post.data.author}</b> in <b>{post.data.subreddit}</b>
              </p>
              <p>
                <Link to={`/post/${encodeURIComponent(post.data.permalink)}`}>
                  {post.data.score} | {post.data.num_comments} comments
                </Link>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
