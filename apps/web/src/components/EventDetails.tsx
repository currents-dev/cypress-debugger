import formatMillis from '@/utils/formatMillis';
import clsx from 'clsx';
import { CypressEvent } from 'cypress-debugger';
import { omit } from 'lodash';

export function Entry({
  param,
  value,
}: {
  param: string;
  value: string | number | boolean;
}) {
  let displayed = value;

  switch (typeof value) {
    case 'string':
      displayed = `"${value}"`;
      break;

    case 'boolean':
      displayed = value ? 'true' : 'false';
      break;
    default:
      displayed = JSON.stringify(value, null, 2);
      break;
  }

  return (
    <li>
      {param}:&nbsp;
      <span className="text-amber-700 dark:text-amber-500 break-all">
        {displayed}
      </span>
    </li>
  );
}

export function EventDetails({ event }: { event: CypressEvent | null }) {
  if (!event) {
    return <p className="pl-4 pt-3">No event selected</p>;
  }

  const parameters = omit(event.payload, 'name', 'wallClockStartedAt');

  const messageParts = event.payload.message.split(',');
  const message =
    event.payload.name === 'task' ? messageParts[0] : event.payload.message;
  const taskArgs =
    event.payload.name === 'task' ? messageParts.slice(1).join(',') : null;

  return (
    <div className="max-h-[calc(100vh-8rem)] overflow-auto ">
      <div className="pl-4 pr-2 py-3 border-b">
        <span
          className={clsx('pr-2', [
            event.payload.state === 'pending'
              ? 'text-amber-500 dark:text-yellow-300'
              : '',
            event.payload.state === 'passed'
              ? 'text-emerald-700 dark:text-emerald-500'
              : '',
            event.payload.state === 'failed'
              ? 'text-red-600 dark:text-red-400'
              : '',
          ])}
        >
          [{event.payload.state}]
        </span>
        {event.payload.type === 'child' && <span> &#8211; </span>}
        <span className="font-semibold">{event.payload.name}</span>
        <ul>
          {message && <Entry param="message" value={message} />}
          {taskArgs && <Entry param="args" value={taskArgs} />}
        </ul>
      </div>
      <ul className="pl-4 pr-2 py-3 border-b">
        <li className="uppercase font-semibold text-sm pb-2">Time</li>
        <Entry param="wall time" value={event.payload.wallClockStartedAt} />
        <Entry param="duration" value={formatMillis(event.duration)} />
      </ul>
      <ul className="pl-4 pr-2 py-3 border-b">
        <li className="uppercase font-semibold text-sm pb-2">Parameters</li>
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
