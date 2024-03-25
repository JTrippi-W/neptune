import PropTypes from 'prop-types';

const RenderThumbnail = ({ post }) => {
  const isValidThumbnail =
    post.thumbnail && !['self', 'default', 'image', 'nsfw'].includes(post.thumbnail);

  const isDirectImage = /\.(jpeg|jpg|gif|png)$/.test(post.url);

  let imageUrl = null;
  if (isValidThumbnail) {
    imageUrl = post.thumbnail;
  } else if (
    post.is_video &&
    post.media &&
    post.media.reddit_video &&
    post.media.reddit_video.scrubber_media_url
  ) {
    // Use scrubber_media_url for videos without a thumbnail
    imageUrl = post.media.reddit_video.scrubber_media_url;
  } else if (isDirectImage) {
    imageUrl = post.url;
  }

  if (imageUrl) {
    return <img src={imageUrl} alt={`Preview for ${post.title}`} loading="lazy" />;
  }

  return null;
};

RenderThumbnail.propTypes = {
  post: PropTypes.shape({
    thumbnail: PropTypes.string,
    url: PropTypes.string,
    title: PropTypes.string,
    is_video: PropTypes.bool,
    media: PropTypes.shape({
      reddit_video: PropTypes.shape({
        scrubber_media_url: PropTypes.string
      })
    })
  }).isRequired
};

export default RenderThumbnail;
