import styles from "./Home.module.scss";
import { PageLayout } from "@/layout";
import {
  BoardView,
  EmptyState,
  useGetColumns,
  useGetTasks,
  useOpenBoardStore,
} from "@/features/board";
import { useEffect } from "react";

const HomePage = () => {
  const openBoardId = useOpenBoardStore((s) => s.openBoard.id);
  const { data: columns = [] } = useGetColumns(openBoardId);
  const { data: tasks = [] } = useGetTasks(openBoardId);

  useEffect(() => {
    const { setOpenBoard } = useOpenBoardStore.getState();
    setOpenBoard({ columns });
  }, [columns]);

  return (
    <PageLayout className={styles.home}>
      {columns.length !== 0 ? (
        <BoardView columns={columns} tasks={tasks} />
      ) : (
        <EmptyState />
      )}
    </PageLayout>
  );
};

export default HomePage;
