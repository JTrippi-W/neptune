const RenderMedia = ({ post }) => {
  if (post.is_video && post.media && post.media.reddit_video) {
    return (
      <video controls loading="lazy">
        <source src={post.media.reddit_video.fallback_url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  } else if (post.url) {
    const isImage = /\.(jpeg|jpg|gif|png)$/.test(post.url);
    if (isImage) {
      return <img src={post.url} alt={post.title} loading="lazy" style={{ maxWidth: '100%' }} />;
    }
  }

  // media type not recognized
  return null;
};

export default RenderMedia;
