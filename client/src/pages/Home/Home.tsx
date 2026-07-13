import styles from "./Home.module.scss";
import { PageLayout } from "@/layout";

const HomePage = () => {
  return (
    <PageLayout
      className={styles.home}
      sidebar={<div>Sidebar</div>}
      header={<div>Header</div>}
    >
      <h1>Home Page</h1>
    </PageLayout>
  );
};

export default HomePage;
