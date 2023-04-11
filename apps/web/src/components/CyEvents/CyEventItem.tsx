import { CypressEvent } from "cypress-debugger";
import { MouseEventHandler } from "react";
import { useCypressEventsContext } from "../../context/cypressEvents";
import styles from "./CyEventItem.module.scss";

export function CyEventItem({
  event,
  active,
  onClick,
}: {
  event: CypressEvent;
  active: boolean;
  onClick: () => void;
}) {
  const payload = event.payload;
  const { setBeforeAfter } = useCypressEventsContext();

  const showButtons =
    (!!event.meta.before.rrId && !!event.meta.before.rrNodes?.length) ||
    (!!event.meta.after.rrId && !!event.meta.after.rrNodes?.length);

  function onBefore(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setBeforeAfter("before");
  }
  function onAfter(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setBeforeAfter("after");
  }
  return (
    <li
      className={`${styles.event} ${active ? styles["event__active"] : ""}`}
      onClick={onClick}
    >
      <span className={styles["event_state"]}>[{payload.state}]&nbsp;</span>
      {payload.type === "child" && <span> - </span>}
      <span className={styles["event_name"]}>{payload.name}</span>
      <div className={styles["event_message"]}>{payload.message}</div>
      <div className={styles["event_actions"]}>
        {showButtons && (
          <>
            <CyEventItemButton onClick={onBefore} disabled={!active}>
              Before
            </CyEventItemButton>
            &nbsp;
            <CyEventItemButton onClick={onAfter} disabled={!active}>
              After
            </CyEventItemButton>
          </>
        )}
      </div>
    </li>
  );
}

const CyEventItemButton = ({
  children,
  onClick,
  disabled,
}: {
  children: string | JSX.Element;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}) => {
  return (
    <button
      type="button"
      className={styles["event_button"]}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
