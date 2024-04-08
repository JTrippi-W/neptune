import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchTerm } from '../../features/SearchResults/searchTermSlice';
import { setSelectedSubreddit } from '../../features/selectedSubreddit/selectedSubredditSlice';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const inputRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (localSearchTerm.trim() === '') {
      inputRef.current.focus();
      return;
    }
    dispatch(setSearchTerm(localSearchTerm));
    dispatch(setSelectedSubreddit(''));
    navigate(`/search/${encodeURIComponent(localSearchTerm)}`);
    setLocalSearchTerm('');
  };

  const handleSearchTermChange = (e) => {
    setLocalSearchTerm(e.target.value);
  };

  return (
    <form onSubmit={handleSearch} className={styles.inputContainer} role="search">
      <label htmlFor="search" className={styles.hidden}>Search Posts</label>
      <input
        ref={inputRef}
        role="searchbox"
        type="text"
        id="search"
        value={localSearchTerm}
        onChange={handleSearchTermChange}
        placeholder="Search Posts"
        aria-label="Search Posts"
      />
      <button type="submit" aria-label="Submit search">Search</button>
    </form>
  );
};

export default SearchBar;
