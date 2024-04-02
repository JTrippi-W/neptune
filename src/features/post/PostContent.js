import { useState } from 'react';
import PropTypes from 'prop-types';
import RenderMedia from '../../utils/RenderMedia';
import ReactMarkdown from 'react-markdown';
import processInlineMedia from '../../utils/processInlineMedia';
import generateLinkBody from '../../utils/generateLinkBody';
import { formatDistanceToNow } from 'date-fns';
import { UpArrowIcon, DownArrowIcon } from '../../common/ArrowIcons';
import styles from './PostContent.module.css';

const PostContent = ({ post }) => {
  const [upVoteFilled, setUpVoteFilled] = useState(false);
  const [downVoteFilled, setDownVoteFilled] = useState(false);
  const postDate = new Date(post.created_utc * 1000);
  const processedText = post.selftext
    ? processInlineMedia(post.selftext, post.media_metadata)
    : null;
  const hasExternalLink =
    !post.is_self && !post.is_video && !/\.(jpeg|jpg|gif|png)$/.test(post.url);

  const handleUpVote = () => {
    setUpVoteFilled(!upVoteFilled);
    if (downVoteFilled) setDownVoteFilled(false);
  };

  const handleDownVote = () => {
    setDownVoteFilled(!downVoteFilled);
    if (upVoteFilled) setUpVoteFilled(false);
  };

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.metadata}>
          Posted by <strong>{post.author}</strong> in <strong>r/{post.subreddit}</strong>
          {' | '}
          <time dateTime={`${postDate.toISOString()}`}>{formatDistanceToNow(postDate)} ago</time>
          {post.link_flair_text && <span className={styles.linkFlair}>{post.link_flair_text}</span>}
        </p>
      </header>
      {hasExternalLink && !post.media_embed ? (
        <a href={post.url} target="_blank" rel="noopener noreferrer">
          {generateLinkBody(post)}
        </a>
      ) : (
        <RenderMedia post={post} />
      )}
      {processedText && <ReactMarkdown>{processedText}</ReactMarkdown>}
      <footer className={styles.footer}>
        <p className={styles.points}>
          <UpArrowIcon filled={upVoteFilled} onClick={handleUpVote} />
          {post.score} Points | Ratio: {post.upvote_ratio}
          <DownArrowIcon filled={downVoteFilled} onClick={handleDownVote} />
        </p>
        <p className={styles.comments}>{post.num_comments} Comments</p>
      </footer>
    </article>
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
    media_embed: PropTypes.object,
    selftext: PropTypes.string,
    media_metadata: PropTypes.object,
    link_flair_text: PropTypes.string,
    link_flair_background_color: PropTypes.string,
    link_flair_text_color: PropTypes.string,
    num_comments: PropTypes.number,
    score: PropTypes.number,
    upvote_ratio: PropTypes.number
  }).isRequired
};

export default PostContent;
