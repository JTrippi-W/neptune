import styles from './PostSkeletonLoader.module.css';

const PostSkeletonLoader = () => {
  return (
    <div className={styles.postSkeleton} aria-hidden="true">
      <div className={styles.skeletonTitle}></div>
      <div className={styles.mediaPlaceholder}></div>
      {[...Array(3)].map((_, index) => (
        <div key={index} className={styles.skeletonText}></div>
      ))}
      <div className={styles.skeletonFooter}></div>
    </div>
  );
};

export default PostSkeletonLoader;
