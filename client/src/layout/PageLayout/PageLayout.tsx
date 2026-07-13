import styles from "./PageLayout.module.scss";

interface PageLayoutProps {
  className?: string;
  sidebar?: React.JSX.Element;
  header: React.JSX.Element;
  children: React.ReactNode;
}

export const PageLayout = ({
  className,
  sidebar,
  header,
  children,
}: PageLayoutProps) => {
  return (
    <div className={`${styles.pageLayout} ${className}`}>
      <aside className={styles.pageLayout__sidebar}>{sidebar}</aside>
      <header className={styles.pageLayout__header}>{header}</header>
      <main className={styles.pageLayout__main}>{children}</main>
    </div>
  );
};
