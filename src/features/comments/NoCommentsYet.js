import styles from './NoCommentsYet.module.css';

const NoCommentsYet = () => {
  return (
    <div className={styles.container}>
      <h4 className={styles.title}>No Comments Yet</h4>
      <p className={styles.message}>Be the first to share.</p>
    </div>
  );
};

export default NoCommentsYet;
