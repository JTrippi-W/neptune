import { useParams } from 'react-router-dom';
import { useGetPostAndCommentsQuery } from '../../api/redditApi';
import PostContent from './PostContent';
import Comments from '../comments/Comments';
import ErrorLoadingPost from './ErrorLoadingPost';
import PostSkeletonLoader from './PostSkeletonLoader';
import CommentsSkeletonLoader from '../comments/CommentsSkeletonLoader';

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

  if (isPostLoading) {
    return (
      <main>
        <PostSkeletonLoader />
        <hr />
        <CommentsSkeletonLoader />
      </main>
    );
  }
  if (isPostError) return <ErrorLoadingPost errorMessage={postError?.data?.message} />;

  const { post, comments } = data;

  return (
    <main>
      {isPostSuccess && (
        <>
          <PostContent post={post} />
          <hr />
          <Comments comments={comments} />
        </>
      )}
    </main>
  );
};

export default Post;
