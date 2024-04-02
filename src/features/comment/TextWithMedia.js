import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

const TextWithMedia = ({ text, mediaMetadata }) => {
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

  return (
    <div>
      <ReactMarkdown>{processedText}</ReactMarkdown>
    </div>
  );
};

TextWithMedia.propTypes = {
  text: PropTypes.string.isRequired,
  mediaMetadata: PropTypes.object
};

export default TextWithMedia;
