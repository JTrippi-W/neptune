import styles from './PostSkeletonLoader.module.css';

const PostSkeletonLoader = () => {
  return (
    <div className={styles.postSkeleton}>
      <div className={styles.skeletonTitle}></div>
      <div className={styles.skeletonText}></div>
      <div className={styles.skeletonText}></div>
      <div className={styles.skeletonFooter}></div>
    </div>
  );
};

export default PostSkeletonLoader;
