import styles from "./PageLayout.module.scss";
import { BoardHeader, BoardSidebar } from "@/layout";
import { cls } from "@/shared/utils/formatters";
import type { PropsWithChildren } from "react";

interface PageLayoutProps extends PropsWithChildren {
  className?: string;
  sidebar?: React.JSX.Element;
  header?: React.JSX.Element;
}

export const PageLayout = (props: PageLayoutProps) => {
  const { className, sidebar, header, children } = props;

  return (
    <div className={styles.pageLayout}>
      <header className={styles.pageLayout__header}>
        {header ?? <BoardHeader />}
      </header>
      <aside className={styles.pageLayout__sidebar}>
        {sidebar ?? <BoardSidebar />}
      </aside>
      <main className={cls(styles.pageLayout__main, className)}>
        {children}
      </main>
    </div>
  );
};
