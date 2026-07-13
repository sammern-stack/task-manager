import styles from "./BoardHeader.module.scss";

export const BoardHeader = () => {
  return (
    <div className={styles.boardHeader}>
      <h1 className={styles.boardHeader__title}>Board Header</h1>
    </div>
  );
};
