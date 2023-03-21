import Image from "next/image";
import { useState } from "react";
import styles from "./Collapsible.module.scss";

export type CollapsibleElement = {
  title: JSX.Element | string;
  content: JSX.Element;
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
        <li key={i} className={styles["collapsible_element"]}>
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
                <Image
                  src="/chevron.svg"
                  alt="chevron"
                  width={12}
                  height={12}
                />
              </div>
             <div className={styles["collapsible_title"]}>{e.title}</div>
            </div>
          </button>
          <div
            className={`${styles["collapsible_content"]} ${
              opened.includes(i) ? styles["collapsible_content__active"] : ""
            }`}
          >
            {e.content}
          </div>
        </li>
      ))}
    </ul>
  );
}
