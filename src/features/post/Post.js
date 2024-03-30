import { useParams } from 'react-router-dom';
import { useGetPostAndCommentsQuery } from '../../api/redditApi';
import PostContent from './PostContent';
import Comments from '../comments/Comments';
import ErrorLoadingPost from './ErrorLoadingPost';
import PostSkeletonLoader from './PostSkeletonLoader';

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

  if (isPostLoading) return <PostSkeletonLoader />;
  if (isPostError) return <ErrorLoadingPost errorMessage={postError?.data?.message} />;

  const { post, comments } = data;

  return (
    <div>
      {isPostSuccess && (
        <>
          <PostContent post={post} />
          <Comments comments={comments} />
        </>
      )}
    </div>
  );
};

export default Post;
