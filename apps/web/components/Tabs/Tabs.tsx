import { useState } from "react";
import styles from "./Tabs.module.scss";

type Tab = {
  title: JSX.Element | string;
  content: JSX.Element;
};

export function Tabs({
  tabs,
  currentIndex = 0,
}: {
  tabs: Tab[];
  currentIndex?: number;
}) {
  const [activeIndex, setActiveIndex] = useState(currentIndex);

  if (!tabs.length) return null;

  return (
    <div className={styles.tabs}>
      <ul className={styles["tabs_nav"]}>
        {tabs.map((t, i) => (
          <li
            key={i}
            className={
              activeIndex === i ? styles["tabs_nav__active"] : undefined
            }
            onClick={() => setActiveIndex(i)}
          >
            {t.title}
          </li>
        ))}
      </ul>

      <ul className={styles["tabs_content"]}>
        {tabs.map((t, i) => (
          <li
            key={i}
            className={`${styles["tabs-content_item"]} ${
              activeIndex === i ? styles["tabs-content_item__active"] : ""
            }`}
          >
            {t.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
