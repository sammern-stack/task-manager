import styles from "./Home.module.scss";
import { PageLayout, BoardHeader, BoardSidebar, BoardContent } from "@/layout";

const HomePage = () => {
  return (
    <PageLayout
      className={styles.home}
      sidebar={<BoardSidebar />}
      header={<BoardHeader />}
    >
      <BoardContent />
    </PageLayout>
  );
};

export default HomePage;
