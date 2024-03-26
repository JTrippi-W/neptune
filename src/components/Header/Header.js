import SubredditAutocomplete from './SubredditAutoComplete';
import SearchBar from './SearchBar';

const Header = () => {
  return (
    <header>
      <h1>Neptune</h1>
      <SubredditAutocomplete />
      <p>or</p>
      <SearchBar />
    </header>
  );
};

export default Header;
