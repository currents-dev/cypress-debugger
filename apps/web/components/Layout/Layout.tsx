import styles from "./Layout.module.scss";

export function Layout({
  topBlock,
  leftSidebar,
  content,
  rightSidebar,
}: {
  topBlock?: JSX.Element;
  leftSidebar?: JSX.Element;
  content?: JSX.Element;
  rightSidebar?: JSX.Element;
}) {
  return (
    <div className={styles.layout}>
      <div className={styles["layout_top-block"]}>{topBlock}</div>
      <div className={styles["layout_main-block"]}>
        <div className={styles["layout_left-sidebar"]}>
          {leftSidebar}
        </div>
        <div className={styles["layout_content"]}>{content}</div>
        <div className={styles["layout_right-sidebar"]}>
          {rightSidebar}
        </div>
      </div>
    </div>
  );
}
