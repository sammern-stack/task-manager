import styles from "./NotFound.module.scss";
import { Link } from "react-router";
import { PageLayout } from "@/layout";

const NotFoundPage = () => {
  return (
    <PageLayout
      className={styles.notFound}
      header={<div>404 Page not found</div>}
    >
      <div className={styles.notFound__content}>
        <h1>404 page not found</h1>
        <Link to="/">Go back home</Link>
      </div>
    </PageLayout>
  );
};

export default NotFoundPage;
