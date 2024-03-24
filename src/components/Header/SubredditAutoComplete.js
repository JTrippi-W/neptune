import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedSubreddit } from '../../features/selectedSubreddit/selectedSubredditSlice';
import { subredditsList } from '../../utils/subredditList';

const SubredditAutocomplete = () => {
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubredditInputChange = (e) => {
    const userInput = e.target.value;
    setLocalSearchTerm(userInput);

    const filteredSuggestions = subredditsList.filter((subreddit) =>
      subreddit.toLowerCase().startsWith(userInput.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prevIndex) =>
          prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
          selectSubreddit(suggestions[highlightedIndex]);
        }
        break;
      default:
        break;
    }
  };

  const selectSubreddit = (subreddit) => {
    dispatch(setSelectedSubreddit(subreddit));
    navigate(`/r/${encodeURIComponent(subreddit)}`);
    setLocalSearchTerm('');
    setSuggestions([]);
  };

  return (
    <div>
      <input
        type="text"
        value={localSearchTerm}
        onChange={handleSubredditInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search for a subreddit"
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.slice(0, 5).map((subreddit, index) => (
            <li
              key={subreddit}
              onClick={() => selectSubreddit(subreddit)}
              // Remove style when css modules are built
              style={{
                background: index === highlightedIndex ? 'lightgray' : 'white'
              }}>
              {subreddit}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SubredditAutocomplete;
