import styles from "./Home.module.scss";
import { PageLayout } from "@/layout";
import {
  EmptyState,
  useOpenBoardStore,
  useGetColumnsByBoardId,
  BoardView,
} from "@/features/board";

const HomePage = () => {
  const openBoardId = useOpenBoardStore((s) => s.openBoard.id);
  const { data: columns = [] } = useGetColumnsByBoardId(openBoardId);

  return (
    <PageLayout className={styles.home}>
      {columns.length !== 0 ? <BoardView columns={columns} /> : <EmptyState />}
    </PageLayout>
  );
};

export default HomePage;
