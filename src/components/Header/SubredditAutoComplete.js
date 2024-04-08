import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedSubreddit } from '../../features/selectedSubreddit/selectedSubredditSlice';
import { setSearchTerm } from '../../features/SearchResults/searchTermSlice';
import { subredditsList } from '../../utils/subredditList';

const SubredditAutoComplete = () => {
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [activeDescendantId, setActiveDescendantId] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentSubreddit = useSelector((state) => state.selectedSubreddit);

  // The input is used as a title when the subreddit changes which can be edited in between
  useEffect(() => {
    setLocalSearchTerm(currentSubreddit);
  }, [currentSubreddit]);

  // Close the suggestion list when the user clicks outside the container
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [suggestions]);

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
    <form className={styles.autoCompleteContainer} ref={containerRef} role="search">
      <span>r/</span>
      <label htmlFor="subredditSearch" className={styles.hidden}>Search for a Subreddit</label>
      <input
        ref={inputRef}
        id="subredditSearch"
        type="text"
        role="searchbox"
        aria-haspopup="listbox"
        aria-label="Search for a subreddit"
        aria-expanded={suggestions.length > 0}
        aria-activedescendant={activeDescendantId}
        value={localSearchTerm}
        onChange={handleSubredditInputChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder="Enter a subreddit name"
      />
      {suggestions.length > 0 && (
        <ul className={styles.suggestionsList} role="listbox">
          {suggestions.slice(0, 5).map((subreddit, index) => {
            const itemId = `suggestion-${index}`;
            return (
              <li
                role="option"
                id={itemId}
                key={subreddit}
                onClick={() => selectSubreddit(subreddit)}
                className={`${styles.suggestionItem} ${index === highlightedIndex ? 'highlighted' : ''}`}
                onMouseOver={() => setActiveDescendantId(itemId)}>
                {subreddit}
              </li>
            );
          })}
        </ul>
      )}
    </form>
  );
};

export default SubredditAutoComplete;
