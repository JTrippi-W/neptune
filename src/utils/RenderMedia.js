import { useState } from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import styles from './RenderMedia.module.css';

const RenderMedia = ({ post }) => {
  const hasVideo = post.is_video && post.media && post.media.reddit_video;
  const hasImage = post.url && (post.url.endsWith('.gif') || post.post_hint === 'image');
  const hasEmbeddedContent = post.secure_media && post.secure_media.type === 'youtube.com';
  const [isLoading, setIsLoading] = useState(hasVideo || hasImage || hasEmbeddedContent);

  const handleMediaLoad = () => {
    setIsLoading(false);
  };

  if (!hasVideo && !hasImage && !hasEmbeddedContent) {
    return null;
  }

  return (
    <div className={hasEmbeddedContent ? styles.playerContainer : styles.mediaContainer}>
      {isLoading && <div className={styles.loadingAnimation}></div>}
      {hasVideo ? (
        <video
          className={styles.mediaContent}
          src={post.media.reddit_video.fallback_url}
          controls
          autoPlay
          loop
          muted
          loading="lazy"
          onLoadedMetadata={handleMediaLoad}></video>
      ) : hasImage ? (
        <img
          className={styles.mediaContent}
          src={post.url_overriden_by_dest || post.url}
          alt={post.title}
          loading="lazy"
          onLoad={handleMediaLoad}
        />
      ) : hasEmbeddedContent ? (
        <ReactPlayer
          url={post.url}
          className={styles.reactPlayer}
          playing
          controls
          onReady={handleMediaLoad}
        />
      ) : null}
    </div>
  );
};

RenderMedia.propTypes = {
  post: PropTypes.shape({
    is_video: PropTypes.bool,
    post_hint: PropTypes.string,
    url: PropTypes.string,
    title: PropTypes.string,
    url_overriden_by_dest: PropTypes.string,
    media: PropTypes.shape({
      reddit_video: PropTypes.shape({
        fallback_url: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number
      })
    }),
    preview: PropTypes.shape({
      images: PropTypes.arrayOf(
        PropTypes.shape({
          source: PropTypes.shape({
            url: PropTypes.string,
            width: PropTypes.number,
            height: PropTypes.number
          }),
          variants: PropTypes.shape({
            gif: PropTypes.shape({
              source: PropTypes.shape({
                url: PropTypes.string,
                width: PropTypes.number,
                height: PropTypes.number
              })
            })
          })
        })
      )
    }),
    secure_media_embed: PropTypes.shape({
      content: PropTypes.string
    }),
    media_metadata: PropTypes.object,
    secure_media: PropTypes.shape({
      type: PropTypes.string,
      oembed: PropTypes.shape({
        author_url: PropTypes.string
      })
    })
  }).isRequired
};

export default RenderMedia;
