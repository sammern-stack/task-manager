import styles from "./Home.module.scss";
import { PageLayout } from "@/layout";
import {
  EmptyState,
  useOpenBoardStore,
  useGetColumns,
  BoardView,
} from "@/features/board";

const HomePage = () => {
  const openBoardId = useOpenBoardStore((s) => s.openBoard.id);
  const { data: columns = [] } = useGetColumns(openBoardId);

  return (
    <PageLayout className={styles.home}>
      {columns.length !== 0 ? <BoardView columns={columns} /> : <EmptyState />}
    </PageLayout>
  );
};

export default HomePage;
