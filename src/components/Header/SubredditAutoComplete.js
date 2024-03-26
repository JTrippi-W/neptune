import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedSubreddit } from '../../features/selectedSubreddit/selectedSubredditSlice';
import { setSearchTerm } from '../../features/SearchResults/searchTermSlice';
import { subredditsList } from '../../utils/subredditList';

const SubredditAutoComplete = () => {
  const inputRef = useRef(null);
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentSubreddit = useSelector((state) => state.selectedSubreddit);

  // The input is used as a title when the subreddit changes which can be edited in between
  useEffect(() => {
    setLocalSearchTerm(currentSubreddit);
  }, [currentSubreddit]);

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
          // User has selected a suggestion with the keyboard
          selectSubreddit(suggestions[highlightedIndex]);
        } else if (localSearchTerm.trim() !== '') {
          // No suggestion is highlighted, but the user has typed and hit enter
          selectSubreddit(localSearchTerm);
        }
        break;
      default:
        break;
    }
  };

  const handleBlur = () => {
    setLocalSearchTerm(currentSubreddit);
  };

  const selectSubreddit = (subreddit) => {
    dispatch(setSelectedSubreddit(subreddit));
    dispatch(setSearchTerm(''));
    navigate(`/r/${encodeURIComponent(subreddit)}`);
    setLocalSearchTerm(subreddit);
    setSuggestions([]);

    if (inputRef.current) {
      inputRef.current.blur(); // Remove focus from the input
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span>r/</span>
      <input
        ref={inputRef}
        type="text"
        value={localSearchTerm}
        onChange={handleSubredditInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder="Enter a subreddit name"
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

export default SubredditAutoComplete;
