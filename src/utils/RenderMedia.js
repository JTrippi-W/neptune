import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';

const RenderMedia = ({ post }) => {
  // Reddit hosted videos
  if (post.is_video && post.media && post.media.reddit_video) {
    return (
      <video controls loading="lazy">
        <source src={post.media.reddit_video.fallback_url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
    // Direct image links
  } else if (/\.(jpeg|jpg|gif|png)$/.test(post.url)) {
    return <img src={post.url} alt={post.title} loading="lazy" />;
  }
  // Embedded media from other sites
  else if (post.media_embed && post.media_embed.content) {
    // Sanitize HTML to prevent XSS vulnerability
    // Necessary for embedded videos and widgets from the API
    const cleanHTML = DOMPurify.sanitize(post.media_embed.content);
    return <div dangerouslySetInnerHTML={{ __html: cleanHTML }} />;
  }

  // media type not recognized
  return null;
};

RenderMedia.propTypes = {
  post: PropTypes.shape({
    is_video: PropTypes.bool,
    media: PropTypes.shape({
      reddit_video: PropTypes.shape({
        fallback_url: PropTypes.string
      })
    }),
    media_embed: PropTypes.shape({
      content: PropTypes.string
    }),
    url: PropTypes.string,
    title: PropTypes.string
  }).isRequired
};

export default RenderMedia;
