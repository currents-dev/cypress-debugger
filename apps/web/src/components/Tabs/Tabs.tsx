import { useState } from 'react';
import styles from './Tabs.module.scss';

type Tab = {
  title: JSX.Element | string;
  content: JSX.Element;
};

function Tabs({
  tabs,
  initialIndex = 0,
}: {
  tabs: Tab[];
  initialIndex?: number;
}) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  if (!tabs.length) return null;

  return (
    <div className={styles.tabs}>
      <ul className={styles.tabs_nav}>
        {tabs.map((t, i) => (
          <li
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            role="presentation"
            onClick={() => setActiveIndex(i)}
            className={activeIndex === i ? styles.tabs_nav__active : undefined}
          >
            {t.title}
          </li>
        ))}
      </ul>

      <ul className={styles.tabs_content}>
        {tabs.map((t, i) => (
          <li
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            className={`${styles['tabs-content_item']} ${
              activeIndex === i ? styles['tabs-content_item__active'] : ''
            }`}
          >
            {t.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tabs;
