import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';

const TextWithMedia = ({ text }) => {
  const urlRegex = /(https?:\/\/\S+\.(?:jpg|jpeg|png|gif)\?\S+)/gi;
  const parts = text.split(urlRegex);

  return (
    <div>
      {parts.map((part, index) => {
        // Check if part is a URL by matching it against the regex
        if (urlRegex.test(part)) {
          // Render URLs as images
          return (
            <img
              key={`image-${index}`}
              src={part}
              alt={`Comment Media ${index}`}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          );
        } else {
          // Render text parts with markdown
          return <ReactMarkdown key={`text-${index}`}>{part}</ReactMarkdown>;
        }
      })}
    </div>
  );
};

TextWithMedia.propTypes = {
  text: PropTypes.string.isRequired
};

export default TextWithMedia;
