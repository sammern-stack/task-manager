import styles from "./FormEditingList.module.scss";
import { useScrollToBottom } from "@/features/board/hooks/useScrollToBottom";
import { Button, Map } from "@/shared/components";

interface FormEditingListProps<T> {
  title: string;
  list: T[];
  render: (item: T) => React.JSX.Element;
  onAdd: () => void;
  buttonLabel: string;
}

export const FormEditingList = <T,>(props: FormEditingListProps<T>) => {
  const { title, list, render, onAdd, buttonLabel } = props;
  const { containerRef, enableScroll } = useScrollToBottom(list.length);

  const handleAddItem = () => {
    enableScroll();
    onAdd();
  };

  return (
    <div className={styles.editingList}>
      <span className={styles.editingList__title}>{title}</span>
      <div ref={containerRef} className={styles.editingList__list}>
        <Map data={list} render={render} />
      </div>
      <Button variant="secondary" onClick={handleAddItem}>
        {buttonLabel}
      </Button>
    </div>
  );
};
