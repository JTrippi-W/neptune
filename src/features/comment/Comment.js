import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import TextWithMedia from './TextWithMedia';
import Replies from './Replies';

const Comment = ({ comment }) => {
  const postDate = new Date(comment.created_utc * 1000);

  if (!comment.body) {
    return <div>This comment has been removed.</div>;
  }

  return (
    <div>
      {/* Render comment body while handling media URLs */}
      <TextWithMedia text={comment.body} mediaMetadata={comment.media_metadata} />
      <p>Posted by {comment.author || '[deleted]'}</p>
      <p>{formatDistanceToNow(postDate)} ago</p>
      <Replies replies={comment.replies} />
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string,
    body: PropTypes.string,
    author: PropTypes.string,
    created_utc: PropTypes.number,
    media_metadata: PropTypes.object,
    replies: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        data: PropTypes.shape({
          children: PropTypes.arrayOf(
            PropTypes.shape({
              kind: PropTypes.string.isRequired,
              data: PropTypes.object.isRequired
            })
          ).isRequired
        }).isRequired
      }).isRequired
    ])
  }).isRequired
};

export default Comment;
