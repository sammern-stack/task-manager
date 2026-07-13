import styles from "./Home.module.scss";
import { PageLayout, BoardHeader, BoardSidebar } from "@/layout";

const HomePage = () => {
  return (
    <PageLayout
      className={styles.home}
      sidebar={<BoardSidebar />}
      header={<BoardHeader />}
    >
      <h1>Home Page</h1>
    </PageLayout>
  );
};

export default HomePage;
