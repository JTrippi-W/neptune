import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RenderThumbnail from '../../utils/RenderThumbnail';

// Component that renders the different types of search results
// The search endpoint provides more types than the subreddit posts endpoint
const SearchResultItem = ({ item }) => {
  switch (item.kind) {
    case 't3': {
      // link/post
      return (
        <li key={item.data.id}>
          <h3>{item.data.title}</h3>
          <RenderThumbnail post={item.data} />
          <p>
            Posted by <b>{item.data.author}</b> in <b>{item.data.subreddit}</b>
          </p>
          <p>
            <Link to={`/post/${encodeURIComponent(item.data.permalink)}`}>
              {item.data.score} | {item.data.num_comments} comments
            </Link>
          </p>
        </li>
      );
    }
    case 't1': {
      // comment
      return (
        <li key={item.data.id}>
          <p>{item.data.body}</p>
          <p>
            Comment by <b>{item.data.author}</b> in <b>{item.data.subreddit}</b>
          </p>
        </li>
      );
    }
    case 't5': {
      // subreddit
      const subredditImage = item.data.header_img;
      return (
        <li key={item.data.id}>
          {subredditImage && (
            <img
              src={subredditImage}
              alt={item.data.display_name}
              style={{ maxWidth: '100px', maxHeight: '100px' }}
            />
          )}
          <h3>{item.data.display_name}</h3>
          <p>{item.data.public_description}</p>
          <p>
            {item.data.subscribers.toLocaleString()} subscribers | {item.data.accounts_active}{' '}
            active now
          </p>
          <p>
            <Link to={`/r/${item.data.display_name}`}>Visit</Link>
          </p>
        </li>
      );
    }
    default:
      return null;
  }
};

SearchResultItem.propTypes = {
  item: PropTypes.shape({
    kind: PropTypes.string.isRequired,
    data: PropTypes.oneOfType([
      PropTypes.shape({
        // Common properties
        id: PropTypes.string.isRequired,
        author: PropTypes.string,
        subreddit: PropTypes.string,
        // post specific
        title: PropTypes.string,
        permalink: PropTypes.string,
        score: PropTypes.number,
        num_comments: PropTypes.number,
        // comment specific
        body: PropTypes.string,
        // subreddit specific
        display_name: PropTypes.string,
        public_description: PropTypes.string,
        subscribers: PropTypes.number,
        header_img: PropTypes.string,
        accounts_active: PropTypes.number
      }).isRequired
    ]).isRequired
  }).isRequired
};

export default SearchResultItem;
