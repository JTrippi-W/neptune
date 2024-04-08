import { useState } from 'react';
import PropTypes from 'prop-types';
import RenderMedia from '../../utils/RenderMedia';
import ReactMarkdown from 'react-markdown';
import processInlineMedia from '../../utils/processInlineMedia';
import { formatDistanceToNow, format } from 'date-fns';
import { UpArrowButton, DownArrowButton } from '../../common/ArrowIcons';
import styles from './PostContent.module.css';

const PostContent = ({ post }) => {
  const [upVoteFilled, setUpVoteFilled] = useState(false);
  const [downVoteFilled, setDownVoteFilled] = useState(false);
  const postDate = new Date(post.created_utc * 1000);
  const processedText = post.selftext
    ? processInlineMedia(post.selftext, post.media_metadata)
    : null;
  const hasExternalLink =
    !post.is_self && !post.is_video && !/\.(jpeg|jpg|gif|png)$/.test(post.url) && !post.media;

  const handleUpVote = (event) => {
    event.stopPropagation();
    setUpVoteFilled(!upVoteFilled);
    if (downVoteFilled) setDownVoteFilled(false);
  };
  const handleDownVote = (event) => {
    event.stopPropagation();
    setDownVoteFilled(!downVoteFilled);
    if (upVoteFilled) setUpVoteFilled(false);
  };

  return (
    <section className={styles.article}>
      <header className={styles.header}>
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.metadata}>
          Posted by <strong>u/{post.author}</strong> in <strong>r/{post.subreddit}</strong>
          {' | '}
          <time dateTime={`${postDate.toISOString()}`}>
            <span className={styles.hidden}>{format(postDate, 'PPpp')}</span>
            {formatDistanceToNow(postDate)} ago
          </time>
          {post.link_flair_text && <span className={styles.linkFlair}>{post.link_flair_text}</span>}
        </p>
      </header>
      {hasExternalLink ? (
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${post.title} - read more at ${post.domain} (opens in new window)`}
          className={styles.externalLink}>
          {post.title} | Read more at {post.domain}
        </a>
      ) : (
        <RenderMedia post={post} />
      )}
      {processedText && (
        <article className={styles.selfText}>
          <ReactMarkdown>{processedText}</ReactMarkdown>
        </article>
      )}
      <footer className={styles.footer}>
        <p className={styles.points}>
          <UpArrowButton
            filled={upVoteFilled}
            onClick={(event) => handleUpVote(event)}
            className={styles.upArrow}
          />
          {post.score} Points | Ratio: {post.upvote_ratio}
          <DownArrowButton
            filled={downVoteFilled}
            onClick={(event) => handleDownVote(event)}
            className={styles.downArrow}
          />
        </p>
        <p className={styles.comments}>{post.num_comments} Comments</p>
      </footer>
    </section>
  );
};

PostContent.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    subreddit: PropTypes.string.isRequired,
    created_utc: PropTypes.number.isRequired,
    is_self: PropTypes.bool.isRequired,
    is_video: PropTypes.bool.isRequired,
    url: PropTypes.string.isRequired,
    domain: PropTypes.string,
    media_embed: PropTypes.object,
    selftext: PropTypes.string,
    media_metadata: PropTypes.object,
    link_flair_text: PropTypes.string,
    link_flair_background_color: PropTypes.string,
    link_flair_text_color: PropTypes.string,
    num_comments: PropTypes.number,
    score: PropTypes.number,
    upvote_ratio: PropTypes.number,
    media: PropTypes.shape({
      type: PropTypes.string
    })
  }).isRequired
};

export default PostContent;
