import { Collapsible } from "../Collapsible/Collapsible";
import styles from "./Network.module.scss";
import { last } from "lodash";
import { getUrlProperties } from "../../utils/getUrProperties";
import {
  HeadersEntity,
  HttpArchiveEntry,
  HttpArchiveEntryResponse,
} from "../../types";

export function Network({ entries }: { entries: HttpArchiveEntry[] }) {
  return (
    <div className={styles.network}>
      <Collapsible
        elements={entries.map((e: HttpArchiveEntry) => ({
          title: <NetworkPreview entry={e} />,
          content: <NetworkDetails entry={e} />,
        }))}
      />
    </div>
  );
}

const NetworkPreview = ({ entry }: { entry: HttpArchiveEntry }) => {
  const resource =
    last(getUrlProperties(entry.request.url)?.pathname.split("/")) ?? null;

  const contentType = entry.response.content?.mimeType ?? null;

  return (
    <div className={styles["network-preview"]}>
      <div className={styles["network-preview_req"]}>
        {entry.response.status}&nbsp;{entry.request.method}&nbsp;
        <div>{resource}</div>
      </div>
      {!!contentType && (
        <div className={styles["network-preview_type"]}>{contentType}</div>
      )}
    </div>
  );
};

const NetworkDetails = ({ entry }: { entry: HttpArchiveEntry }) => {
  return (
    <div className={styles["network-details"]}>
      <ul>
        <li className={styles["network-details_title"]}>URL</li>
        <li className={styles["network-details_value"]}>{entry.request.url}</li>
      </ul>
      {entry.request.headers && (
        <ul>
          <li className={styles["network-details_title"]}>Request Headers</li>
          {entry.request.headers.map((h: HeadersEntity, i: number) => (
            <HeadersEntry key={i} header={h} />
          ))}
        </ul>
      )}
      {entry.response.headers && (
        <ul>
          <li className={styles["network-details_title"]}>Response Headers</li>
          {entry.response.headers.map((h: HeadersEntity, i: number) => (
            <HeadersEntry key={i} header={h} />
          ))}
        </ul>
      )}
      {!!entry.response.content && (
        <div>
          <div className={styles["network-details_title"]}>Response Body</div>
          <ResponseBody content={entry.response.content} />
        </div>
      )}
    </div>
  );
};

const HeadersEntry = ({ header }: { header: HeadersEntity }) => {
  return (
    <li>
      :<span className={styles["header-entry_name"]}>{header.name}</span>:&nbsp;
      {header.value}
    </li>
  );
};

const ResponseBody = ({
  content,
}: {
  content: HttpArchiveEntryResponse["content"];
}) => {
  return (
    <div>
      <pre>{JSON.stringify(content, null, 2)}</pre>
    </div>
  );
};
