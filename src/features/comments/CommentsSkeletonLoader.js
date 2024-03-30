import styles from './CommentsSkeletonLoader.module.css';

const CommentsSkeletonLoader = () => {
  return (
    <div className={styles.commentsSkeleton}>
      <hr />
      {Array.from({ length: 15 }).map((_, index) => (
        <div key={index} className={styles.skeletonComment}></div>
      ))}
    </div>
  );
};

export default CommentsSkeletonLoader;
