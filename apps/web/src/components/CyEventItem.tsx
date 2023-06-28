import { Button } from '@/components/ui/Button';
import { useCypressEventsContext } from '@/context/cypressEvents';
import { testStateVariants } from '@/lib/testState';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import clsx from 'clsx';
import { CypressEvent } from 'cypress-debugger';

const itemVariants = cva(
  'py-2 border-b px-4 hover:bg-slate-200 dark:hover:bg-slate-800 hover:cursor-pointer',
  {
    variants: {
      active: {
        default: '',
        true: 'bg-slate-300 dark:bg-slate-700',
      },
    },
    defaultVariants: {
      active: 'default',
    },
  }
);

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

  return (
    <li
      className={cn(itemVariants({ active }))}
      onClick={onClick}
      role="presentation"
    >
      <span
        className={clsx(
          'pr-2',
          cn(testStateVariants({ state: payload.state }))
        )}
      >
        [{payload.state}]
      </span>
      {payload.type === 'child' && <span> &#8211; </span>}
      <span className="font-semibold">{payload.name}</span>
      <p className="text-sm mt-1">
        {payload.message ? (
          <span>&ldquo;&nbsp;{payload.message}&nbsp;&rdquo;</span>
        ) : (
          payload.message
        )}
      </p>
      {showButtons && (
        <div className="py-2 pb-1 flex gap-2">
          <Button
            onClick={onBefore}
            disabled={!active}
            className="h-8 rounded border font-normal"
          >
            Before
          </Button>
          <Button
            onClick={onAfter}
            disabled={!active}
            className="h-8 rounded border font-normal"
          >
            After
          </Button>
        </div>
      )}
    </li>
  );
}

export default CyEventItem;
