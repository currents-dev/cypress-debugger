import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/Accordion';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/Collapsible';
import {
  HeadersEntity,
  HttpArchiveEntry,
  HttpArchiveEntryResponse,
} from 'cypress-debugger';
import { last } from 'lodash';

import getUrlProperties from '@/utils/getUrProperties';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

function NetworkPreview({ entry }: { entry: HttpArchiveEntry }) {
  const resource =
    last(getUrlProperties(entry.request.url)?.pathname.split('/')) ?? null;

  const contentType = entry.response.content?.mimeType ?? null;

  return (
    <div className="w-full flex justify-between align-middle text-sm pr-1">
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

function HighlightedValue({ value }: { value: string | number | boolean }) {
  return <span className="text-amber-700 dark:text-amber-500">{value}</span>;
}

function HeadersEntry({ header }: { header: HeadersEntity }) {
  return (
    <li className="text-sm">
      :<span>{header.name}</span>: <HighlightedValue value={header.value} />
    </li>
  );
}

function ResponseBody({
  content,
}: {
  content: HttpArchiveEntryResponse['content'];
}) {
  const [show, setShow] = useState<boolean>(false);

  return (
    <ul className="flex-col">
      <li>
        MIME Type: <HighlightedValue value={content.mimeType} />
      </li>
      <li>
        Size: <HighlightedValue value={`${content.size} Bytes`} />
      </li>
      <li>
        Compression: <HighlightedValue value={content.compression ?? '-'} />
      </li>
      <li>
        <Collapsible>
          <CollapsibleTrigger onClick={() => setShow((v) => !v)}>
            <div className="flex items-center">
              <span className="pr-1">Content</span>
              {show ? (
                <ChevronDown className="h-4 w-4 bg-accent" />
              ) : (
                <ChevronRight className="h-4 w-4 bg-accent" />
              )}
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-2 w-full overflow-auto bg-accent">
              <pre>{content.text}</pre>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </li>
    </ul>
  );
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
