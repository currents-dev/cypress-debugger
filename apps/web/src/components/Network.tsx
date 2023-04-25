import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion';
import {
  HeadersEntity,
  HttpArchiveEntry,
  HttpArchiveEntryResponse,
} from 'cypress-debugger';
import { last } from 'lodash';

import getUrlProperties from '@/utils/getUrProperties';

function NetworkPreview({ entry }: { entry: HttpArchiveEntry }) {
  const resource =
    last(getUrlProperties(entry.request.url)?.pathname.split('/')) ?? null;

  const contentType = entry.response.content?.mimeType ?? null;

  return (
    <div className="w-full flex justify-between align-middle text-sm">
      <p className="w-48 overflow-hidden text-ellipsis whitespace-nowrap text-left">
        {entry.response.status} {entry.request.method} {resource}
      </p>
      {!!contentType && (
        <p className="w-36 overflow-hidden text-ellipsis whitespace-nowrap text-right">
          {contentType}
        </p>
      )}
    </div>
  );
}

function HeadersEntry({ header }: { header: HeadersEntity }) {
  return (
    <li className="text-sm">
      :<span>{header.name}</span>:{' '}
      <span className="text-amber-700 dark:text-amber-500">{header.value}</span>
    </li>
  );
}

function ResponseBody({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  content,
}: {
  content: HttpArchiveEntryResponse['content'];
}) {
  // TODO: display the content
  return <div>Content</div>;
}

function NetworkDetails({ entry }: { entry: HttpArchiveEntry }) {
  return (
    <div className="pl-4 pr-2">
      <ul className="py-4 border-b break-all">
        <li className="uppercase font-semibold text-xs pb-2">URL</li>
        <li className="text-emerald-700 dark:text-emerald-500">
          {entry.request.url}
        </li>
      </ul>
      {entry.request.headers && (
        <ul className="py-4 border-b break-all">
          <li className="uppercase font-semibold text-xs pb-2">
            Request Headers
          </li>
          {entry.request.headers.map((h: HeadersEntity) => (
            <HeadersEntry key={h.name} header={h} />
          ))}
        </ul>
      )}
      {entry.response.headers && (
        <ul className="py-4 border-b break-all">
          <li className="uppercase font-semibold text-xs pb-2">
            Response Headers
          </li>
          {entry.response.headers.map((h: HeadersEntity) => (
            <HeadersEntry key={h.name} header={h} />
          ))}
        </ul>
      )}
      {!!entry.response.content && (
        <div className="py-4">
          <p className="uppercase font-semibold text-xs pb-2">Response Body</p>
          <ResponseBody content={entry.response.content} />
        </div>
      )}
    </div>
  );
}

function Network({ entries }: { entries: HttpArchiveEntry[] }) {
  if (entries.length === 0) {
    return <p className="pl-4 pt-3">No records</p>;
  }

  return (
    <div className="max-h-[calc(100vh-8rem)] overflow-auto">
      <Accordion type="multiple">
        {entries.map((e: HttpArchiveEntry, i) => (
          <AccordionItem value={i.toString()} key={i}>
            <AccordionTrigger className="py-2 pl-4 pr-2">
              <NetworkPreview entry={e} />
            </AccordionTrigger>
            <AccordionContent>
              <NetworkDetails entry={e} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default Network;
