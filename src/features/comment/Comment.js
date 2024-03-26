import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

const Comment = ({ comment }) => {
  const postDate = new Date(comment.created_utc * 1000);

  // Render replies if they exist
  const renderReplies = (replies) => {
    // Ensure replies exist
    if (!replies || typeof replies === 'string' || replies.length === 0) {
      return null;
    }

    const repliesData = replies.data?.children || [];

    return repliesData.map((reply, index) => {
      // Skip over "more" types which don't contain a comment
      if (reply.kind === 'more') {
        return null;
      }

      return <Comment key={index} comment={reply.data} />;
    });
  };

  if (!comment.body) {
    return <div>This comment has been removed.</div>;
  }

  return (
    <div>
      <p>{comment.body}</p>
      <p>Posted by {comment.author || '[deleted]'}</p>
      <p>{formatDistanceToNow(postDate)} ago</p>
      {comment.replies ? (
        <div style={{ marginLeft: '1rem' }}>{renderReplies(comment.replies)}</div>
      ) : null}
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string,
    body: PropTypes.string,
    author: PropTypes.string,
    created_utc: PropTypes.number,
    replies: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        data: PropTypes.shape({
          children: PropTypes.arrayOf(
            PropTypes.shape({
              data: PropTypes.object
            })
          )
        })
      })
    ])
  }).isRequired
};

export default Comment;
