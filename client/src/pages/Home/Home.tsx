import styles from "./Home.module.scss";
import { PageLayout } from "@/layout";
import { ColumnList } from "@/features/board";

const HomePage = () => {
  return (
    <PageLayout className={styles.home}>
      <div className={styles.home__content}>
        <ColumnList />
      </div>
    </PageLayout>
  );
};

export default HomePage;
