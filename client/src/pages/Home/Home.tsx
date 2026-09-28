import styles from "./Home.module.scss";
import { PageLayout } from "@/layout";
import {
  Column,
  CreateColumn,
  EmptyState,
  useOpenBoardStore,
} from "@/features/board";
import { useGetColumnsByBoardId } from "@/features/board/hooks/useBoards";

const HomePage = () => {
  const openBoardId = useOpenBoardStore((s) => s.openBoard.id) ?? "";
  const { data: columns = [] } = useGetColumnsByBoardId(openBoardId);
  const isColumnsEmpty = columns.length === 0;

  return (
    <PageLayout className={styles.home}>
      <div className={styles.home__content}>
        {!isColumnsEmpty ? (
          <div className={styles.columnList}>
            {columns.map((column) => (
              <Column key={column._id} column={column} />
            ))}
            <CreateColumn />
          </div>
        ) : (
          <EmptyState />
        )}
      </div>
    </PageLayout>
  );
};

export default HomePage;
