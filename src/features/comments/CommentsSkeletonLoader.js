import styles from './CommentsSkeletonLoader.module.css';

const CommentsSkeletonLoader = () => {
  const indentClasses = [styles.level0, styles.level1, styles.level2];

  return (
    <div className={styles.commentsSkeleton} aria-hidden="true">
      <hr />
      {Array.from({ length: 15 }).map((_, index) => (
        <div key={index} className={styles.skeletonComment}>
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className={`${styles.skeletonComment} ${indentClasses[index % indentClasses.length]}`}>
              <div className={styles.skeletonAuthor}></div>
              <div className={styles.skeletonText}></div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CommentsSkeletonLoader;
