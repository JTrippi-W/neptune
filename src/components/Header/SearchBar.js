import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchTerm } from '../../features/searchTerm/searchTermSlice';
import { setSelectedSubreddit } from '../../features/selectedSubreddit/selectedSubredditSlice';

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
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={localSearchTerm}
        onChange={handleSearchTermChange}
        placeholder="Search"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
