import styles from "./Home.module.scss";
import { PageLayout } from "@/layout";
import {
  Column,
  CreateColumn,
  EmptyState,
  useOpenBoardStore,
  useGetColumnsByBoardId,
} from "@/features/board";
import { Map } from "@/shared/components";

const HomePage = () => {
  const openBoardId = useOpenBoardStore((s) => s.openBoard.id) ?? "";
  const { data: columns = [] } = useGetColumnsByBoardId(openBoardId);

  return (
    <PageLayout className={styles.home}>
      {columns.length !== 0 ? (
        <div className={styles.home__columns}>
          <Map
            data={columns}
            render={(column) => <Column key={column._id} column={column} />}
          />
          <CreateColumn />
        </div>
      ) : (
        <EmptyState />
      )}
    </PageLayout>
  );
};

export default HomePage;
