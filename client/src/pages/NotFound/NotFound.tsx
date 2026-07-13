import { Link } from "react-router";
import styles from "./NotFound.module.scss";

const NotFoundPage = () => {
  return (
    <div className={styles.notFound}>
      <h1>404 page not found</h1>
      <Link to="/">Go back home</Link>
    </div>
  );
};

export default NotFoundPage;
