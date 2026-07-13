import styles from "./Loading.module.scss";
import { PageLayout } from "@/layout";

const LoadingPage = () => {
  return (
    <PageLayout className={styles.loading} header={<div>Loading...</div>}>
      <div className={styles.loading__content}>
        <p>Loading...</p>
      </div>
    </PageLayout>
  );
};

export default LoadingPage;
