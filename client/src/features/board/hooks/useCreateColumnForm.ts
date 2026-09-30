import * as Yup from "yup";
import { useToastStore } from "@/shared/stores";
import { useOpenBoardStore } from "../stores/openBoardStore";
import { useCreateColumn } from "../";
import type { FormikConfig } from "formik";

export const useCreateColumnForm = (
  toggleForm: () => void,
): FormikConfig<{ name: string }> => {
  const addToast = useToastStore((s) => s.addToast);
  const openBoardId = useOpenBoardStore((s) => s.openBoard.id) ?? "";
  const { mutate: createColumn } = useCreateColumn(openBoardId);

  return {
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
};
