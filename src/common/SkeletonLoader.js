import styles from './SkeletonLoader.module.css';

const SkeletonLoader = () => {
  return (
    <ul>
      {Array.from({ length: 10 }).map((_, index) => (
        <li key={index} className={styles.skeletonContainer}>
          <div className={`${styles.SkeletonElement} ${styles.skeletonTitle}`}></div>
          <div className={`${styles.SkeletonElement} ${styles.skeletonMetadata}`}></div>
          <div className={`${styles.SkeletonElement} ${styles.skeletonFooter}`}></div>
        </li>
      ))}
    </ul>
  );
};

export default SkeletonLoader;
