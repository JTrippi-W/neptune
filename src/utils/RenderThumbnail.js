import PropTypes from 'prop-types';

const RenderThumbnail = ({ post }) => {
  let imageUrl = null;

  // Check for high-quality images first
  if (post.preview && post.preview.images && post.preview.images.length > 0) {
    imageUrl = post.preview.images[0].source.url;
  } else if (post.thumbnail && !['self', 'default', 'image', 'nsfw'].includes(post.thumbnail)) {
    // Use reddit's thumbnail
    imageUrl = post.thumbnail;
  } else if (
    post.is_video &&
    post.media &&
    post.media.reddit_video &&
    post.media.reddit_video.scrubber_media_url
  ) {
    // Use scrubber_media_url for videos without a thumbnail
    imageUrl = post.media.reddit_video.scrubber_media_url;
  } else if (/\.(jpeg|jpg|gif|png)$/.test(post.url)) {
    // Direct image URL
    imageUrl = post.url;
  }

  if (imageUrl) {
    const unescapedImageUrl = unescapeHtml(imageUrl);
    return <img src={unescapedImageUrl} alt={`Preview for ${post.title}`} loading="lazy" />;
  }

  return null;
};

// Utility to unescape HTML entities in URLs
function unescapeHtml(unsafe) {
  return unsafe.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
}

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
    }),
    preview: PropTypes.shape({
      images: PropTypes.arrayOf(
        PropTypes.shape({
          source: PropTypes.shape({
            url: PropTypes.string
          })
        })
      )
    })
  }).isRequired
};

export default RenderThumbnail;
