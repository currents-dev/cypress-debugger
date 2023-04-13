import { CypressEvent } from 'cypress-debugger';
import { MouseEventHandler } from 'react';
import { useCypressEventsContext } from '../../context/cypressEvents';
import styles from './CyEventItem.module.scss';

function CyEventItemButton({
  children,
  onClick,
  disabled = false,
}: {
  children: string | JSX.Element;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      className={styles.event_button}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function CyEventItem({
  event,
  active,
  onClick,
}: {
  event: CypressEvent;
  active: boolean;
  onClick: () => void;
}) {
  const { payload } = event;
  const { setBeforeAfter } = useCypressEventsContext();

  const showButtons =
    (!!event.meta.before.rrId && !!event.meta.before.rrNodes?.length) ||
    (!!event.meta.after.rrId && !!event.meta.after.rrNodes?.length);

  const onBefore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setBeforeAfter('before');
  };

  const onAfter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setBeforeAfter('after');
  };

  const className = `${styles.event} ${active ? styles.event__active : ''}`;

  return (
    <li className={className} onClick={onClick} role="presentation">
      <span className={styles.event_state}>[{payload.state}]&nbsp;</span>
      {payload.type === 'child' && <span> - </span>}
      <span className={styles.event_name}>{payload.name}</span>
      <div className={styles.event_message}>{payload.message}</div>
      <div className={styles.event_actions}>
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

export default CyEventItem;
