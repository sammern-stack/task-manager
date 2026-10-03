import styles from "./Home.module.scss";
import { PageLayout } from "@/layout";
import {
  BoardView,
  EmptyState,
  useGetColumns,
  useGetTasks,
  useOpenBoardStore,
} from "@/features/board";

const HomePage = () => {
  const openBoardId = useOpenBoardStore((s) => s.openBoard.id);
  const { data: columns = [] } = useGetColumns(openBoardId);
  const { data: tasks = [] } = useGetTasks(openBoardId);

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
