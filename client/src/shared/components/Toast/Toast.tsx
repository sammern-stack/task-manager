import styles from "./Toast.module.scss";
import { useEffect } from "react";
import { useToastStore } from "@/shared/stores/toastStore";

export const Toast = () => {
  const toasts = useToastStore((s) => s.toasts);
  const removeToast = useToastStore((s) => s.removeToast);

  useEffect(() => {
    if (toasts.length === 0) return;

    const timer = setTimeout(() => {
      removeToast(toasts[0].id);
    }, 2000);

    return () => clearTimeout(timer);
  }, [toasts, removeToast]);

  return (
    <div className={styles.toastContainer}>
      {toasts.map((toast) => (
        <div key={toast.id} className={`${styles.toast} ${styles[toast.type]}`}>
          {toast.message}
        </div>
      ))}
    </div>
  );
};
