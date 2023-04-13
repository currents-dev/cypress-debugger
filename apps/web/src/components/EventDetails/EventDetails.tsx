import { CypressEvent } from 'cypress-debugger';
import { omit } from 'lodash';
import formatMillis from '../../utils/formatMillis';
import styles from './EventDetails.module.scss';

export function Entry({
  param,
  value,
}: {
  param: string;
  value: string | number | boolean;
}) {
  let displayed = value;

  if (typeof value === 'string') {
    displayed = `"${value}"`;
  } else if (typeof value === 'boolean') {
    displayed = `${value}`;
  }

  return (
    <li>
      {param}:&nbsp;<span className={styles.details_value}>{displayed}</span>
    </li>
  );
}

export function EventDetails({ event }: { event: CypressEvent | null }) {
  if (!event) {
    return <div>No event selected</div>;
  }

  const parameters = omit(event.payload, 'name', 'wallClockStartedAt');

  const messageParts = event.payload.message.split(',');
  const message =
    event.payload.name === 'task' ? messageParts[0] : event.payload.message;
  const taskArgs =
    event.payload.name === 'task' ? messageParts.slice(1).join(',') : null;

  return (
    <div className={styles.details}>
      <ul className={styles.details_block}>
        <li className={styles.details_value}>{event.payload.name}</li>
        {message && (
          <li>
            message: <span className={styles.details_value}>{message}</span>
          </li>
        )}
        {taskArgs && (
          <li>
            args: <span className={styles.details_value}>{taskArgs}</span>
          </li>
        )}
      </ul>
      <ul className={styles.details_block}>
        <li className={styles.details_title}>Time</li>
        <li>
          wall time:{' '}
          <span className={styles.details_value}>
            {event.payload.wallClockStartedAt}
          </span>
        </li>
        <li>
          duration:{' '}
          <span className={styles.details_value}>
            {formatMillis(event.duration)}
          </span>
        </li>
      </ul>
      <ul className={styles.details_block}>
        <li className={styles.details_title}>Parameters</li>
        {Object.entries(parameters).map(([key, value]) => (
          <Entry
            key={key}
            param={key}
            value={value as string | number | boolean}
          />
        ))}
      </ul>
    </div>
  );
}
