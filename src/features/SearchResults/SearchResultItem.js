import PostResult from './PostResult';
import SubredditResult from './SubredditResult';
import PropTypes from 'prop-types';

// Component that renders the different types of search results
// The search endpoint provides more types than the subreddit posts endpoint
const SearchResultItem = ({ item }) => {
  switch (item.kind) {
    case 't3': {
      return <PostResult post={item.data} />;
    }
    case 't5': {
      return <SubredditResult data={item.data} />;
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
