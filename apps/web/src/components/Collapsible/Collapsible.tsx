import { useState } from "react";
import styles from "./Collapsible.module.scss";

export type CollapsibleElement = {
  title: JSX.Element | string;
  content: JSX.Element;
  className?: string;
};

export function Collapsible({ elements }: { elements: CollapsibleElement[] }) {
  const [opened, setOpened] = useState<number[]>([]);

  const handleClick = (i: number) => {
    setOpened((o) => {
      if (o.includes(i)) {
        const copy = o.slice();
        copy.splice(
          o.findIndex((e) => e === i),
          1
        );
        return copy;
      }

      return [...o, i];
    });
  };

  return (
    <ul className={styles.collapsible}>
      {elements.map((e, i) => (
        <li key={i} className={e.className ?? ""}>
          <button
            type="button"
            className={styles["collapsible_button"]}
            onClick={() => handleClick(i)}
          >
            <div className={styles["collapsible_button-content"]}>
              <div
                className={`${styles["collapsible_chevron"]} ${
                  opened.includes(i)
                    ? styles["collapsible_chevron__active"]
                    : ""
                }`}
              >
                <img
                  src="/chevron_right.svg"
                  alt="chevron"
                  width={20}
                  height={20}
                />
              </div>
              <div className={styles["collapsible_title"]}>{e.title}</div>
            </div>
          </button>
          {opened.includes(i) ? (
            <div className={styles["collapsible_content"]}>{e.content}</div>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
