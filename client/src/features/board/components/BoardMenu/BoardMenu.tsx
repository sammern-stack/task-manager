import styles from "./BoardMenu.module.scss";

export const BoardMenu = () => {
  const handleEditBoard = () => {
    alert("Edit Board clicked");
    // Logic to handle editing a board
  };

  const handleDeleteBoard = () => {
    alert("Delete Board clicked");
    // Logic to handle deleting a board
  };

  return (
    <ul className={styles.boardMenu}>
      <li className={styles.boardMenu__action} onClick={handleEditBoard}>
        Edit Board
      </li>
      <li className={styles.boardMenu__action} onClick={handleDeleteBoard}>
        Delete Board
      </li>
    </ul>
  );
};
