import SubredditAutocomplete from './SubredditAutoComplete';
import SearchBar from './SearchBar';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.appTitle}>Neptune</h1>
      <section className={styles.searchAndAutoComplete}>
        <SubredditAutocomplete className={styles.subredditAutoComplete} />
        <p className={styles.inputSeparator}>or</p>
        <SearchBar className={styles.searchBar} />
      </section>
    </header>
  );
};

export default Header;
