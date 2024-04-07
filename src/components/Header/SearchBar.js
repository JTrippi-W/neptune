import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchTerm } from '../../features/SearchResults/searchTermSlice';
import { setSelectedSubreddit } from '../../features/selectedSubreddit/selectedSubredditSlice';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [localSearchTerm, setLocalSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(localSearchTerm));
    dispatch(setSelectedSubreddit(''));
    navigate(`/search/${encodeURIComponent(localSearchTerm)}`);
    setLocalSearchTerm('');
  };

  const handleSearchTermChange = (e) => {
    setLocalSearchTerm(e.target.value);
  };

  return (
    <form onSubmit={handleSearch} className={styles.inputContainer}>
      <input
        type="text"
        id="search"
        value={localSearchTerm}
        onChange={handleSearchTermChange}
        placeholder="Search"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
