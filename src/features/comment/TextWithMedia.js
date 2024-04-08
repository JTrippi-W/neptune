import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { useMemo } from 'react';
import styles from './TextWithMedia.module.css';

const TextWithMedia = ({ text, mediaMetadata }) => {
  const components = useMemo(
    () => ({
      img: ({ src, alt }) => {
        return <img src={src} alt={alt || 'Comment media'} className={styles.media} />;
      },
      a: ({ ...props }) => {
        return <a {...props} className={styles.commentLink} />;
      }
    }),
    []
  );

  const urlRegex = /(https?:\/\/\S+\.(?:jpg|jpeg|png|gif)\?\S+)|!\[gif\]\((giphy\|\w+)\)/gi;
  const processedText = text.replace(urlRegex, (match, url, gifID) => {
    if (url) {
      return `![](${url})`;
    } else if (gifID && mediaMetadata[gifID]) {
      const gifUrl = mediaMetadata[gifID].s.gif;
      return `![](${gifUrl})`;
    }
    return match;
  });

  return <ReactMarkdown components={components}>{processedText}</ReactMarkdown>;
};

TextWithMedia.propTypes = {
  text: PropTypes.string.isRequired,
  mediaMetadata: PropTypes.object
};

export default TextWithMedia;
