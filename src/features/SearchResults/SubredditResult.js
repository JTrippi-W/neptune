import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './SubredditResult.module.css';

const SubredditResult = ({ data }) => {
  return (
    <article className={SubredditResult}>
      <Link
        to={`/r/${data.display_name}`}
        aria-label={`Visit subreddit ${data.display_name}}`}
        className={styles.link}>
        {data.header_img && (
          <img
            src={data.header_img}
            alt={data.display_name}
            loading="lazy"
            className={styles.headerImg}
            aria-label={`Thumbnail for subreddit ${data.display_name}`}
          />
        )}
        <h3 className={styles.info}>{data.display_name}</h3>
        <p className={styles.description}>{data.public_description}</p>
        <p className={styles.info}>
          {data.subscribers.toLocaleString()} subscribers | {data.accounts_active} active now
        </p>
      </Link>
    </article>
  );
};

SubredditResult.propTypes = {
  data: PropTypes.shape({
    header_img: PropTypes.string,
    display_name: PropTypes.string,
    public_description: PropTypes.string,
    subscribers: PropTypes.number,
    accounts_active: PropTypes.number
  }).isRequired
};

export default SubredditResult;
