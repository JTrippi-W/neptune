import PropTypes from 'prop-types';

const RenderThumbnail = (post) => {
  let thumbnailUrl = post.thumbnail && post.thumbnail !== 'self' ? post.thumbnail : post.url;

  if (!thumbnailUrl && /\.(jpeg|jpg|gif|png)$/.test(post.url)) {
    thumbnailUrl = post.url;
  }

  if (thumbnailUrl) {
    return (
      <img
        src={thumbnailUrl}
        alt={`Preview for ${post.title}`}
        loading="lazy"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    );
  } else if (post.selftext) {
    return <p>{post.selftext}</p>;
  } else {
    return <p>Just a title.</p>;
  }
};

RenderThumbnail.propTypes = {
  post: PropTypes.shape({
    thumbnail: PropTypes.string.isRequired,
    url: PropTypes.string,
    title: PropTypes.string,
    selftext: PropTypes.string
  })
};

export default RenderThumbnail;
