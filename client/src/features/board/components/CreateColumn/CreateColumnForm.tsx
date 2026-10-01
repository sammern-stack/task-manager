import styles from "./CreateColumn.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useCreateColumnForm } from "../../hooks/useCreateColumnForm";

interface CreateColumnFormProps {
  toggleForm: () => void;
}

export const CreateColumnForm = ({ toggleForm }: CreateColumnFormProps) => {
  const formik = useCreateColumnForm(toggleForm);

  return (
    <Formik {...formik}>
      {({ isSubmitting }) => (
        <Form className={styles.createColumn__form}>
          <h2>Create New Column</h2>
          <div className={styles.createColumn__field}>
            <label htmlFor="name">Column Name</label>
            <Field id="name" name="name" />
            <ErrorMessage name="name" component="div" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create"}
          </button>
          <button type="button" onClick={toggleForm}>
            Cancel
          </button>
        </Form>
      )}
    </Formik>
  );
};
