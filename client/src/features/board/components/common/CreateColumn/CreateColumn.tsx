import styles from "./CreateColumn.module.scss";
import { useState } from "react";
import * as Yup from "yup";
import { Form, Formik, Field, ErrorMessage } from "formik";
import type { FormikConfig } from "formik";
import { Heading } from "@/shared/components";
import { useOpenBoardStore } from "@/features/board/stores/openBoardStore";
import { useCreateColumn } from "@/features/board/hooks/useBoards";
import { useToastStore } from "@/shared/stores";

export const CreateColumn = () => {
  const [isCreating, setIsCreating] = useState(false);

  const toggleCreating = () => setIsCreating(!isCreating);

  return (
    <div className={styles.createColumn}>
      {isCreating ? (
        <CreateColumnForm toggleForm={toggleCreating} />
      ) : (
        <Heading
          size="h1"
          className={styles.createColumn__title}
          onClick={toggleCreating}
        >
          + New Column
        </Heading>
      )}
    </div>
  );
};

interface CreateColumnFormProps {
  toggleForm: () => void;
}

const CreateColumnForm = ({ toggleForm }: CreateColumnFormProps) => {
  const addToast = useToastStore((s) => s.addToast);
  const openBoardId = useOpenBoardStore((s) => s.openBoard.id);
  const { mutate: createColumn } = useCreateColumn(openBoardId ?? "");

  const formik: FormikConfig<{ name: string }> = {
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Column name is required"),
    }),
    onSubmit: (values, { setFieldError }) => {
      createColumn(
        { name: values.name },
        {
          onSuccess: (data) => {
            addToast({ message: data.message, type: "success" });
            toggleForm();
          },
          onError: (error) => {
            addToast({ message: error.message, type: "error" });
            setFieldError("name", error.message);
          },
        },
      );
    },
  };

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
