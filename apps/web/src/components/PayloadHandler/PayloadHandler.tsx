import { TestExecutionResult } from "@currents/cypress-debugger";
import { useEffect, useState } from "react";
import { useReplayerContext } from "../../context/replayer";
import { usePayloadFetcher } from "../../hooks/usePayloadFetcher";
import { JsonFileUpload } from "../FileUpload/FileUpload";
import styles from "./PayloadHandler.module.scss";
import { useHttpArchiveContext } from "../../context/httpArchiveEntries";
import { useCypressEventsContext } from "../../context/cypressEvents";
import { usePayloadQueryParam } from "../../hooks/useQuery";

export function PayloadHandler() {
  const [loading, setLoading] = useState(false);

  const { origin, setOrigin, setReplayerData } = useReplayerContext();
  const { setHttpArchiveLog } = useHttpArchiveContext();

  const { setEvents, setMeta, setBrowserLogs } = useCypressEventsContext();

  const [param, , clearParam] = usePayloadQueryParam();

  usePayloadFetcher({
    onData: ({
      payload,
      param,
    }: {
      payload: TestExecutionResult;
      param: string;
    }) => {
      if (validate(payload)) {
        handleDataChange(payload);
        setOrigin(param);
      } else {
        console.error("Invalid payload URL");
      }
    },
    onLoading: setLoading,
  });

  const handleDataChange = (payload: TestExecutionResult | null) => {
    setEvents(payload?.cy || []);
    setReplayerData(payload?.rr || []);
    setHttpArchiveLog(payload?.har || null);
    setMeta(payload?.meta ?? null);
    setBrowserLogs(payload?.browserLogs || null);
  };

  useEffect(() => {
    if (!param) {
      setOrigin(null);
      handleDataChange(null);
    }
  }, [param]); // eslint-disable-line

  const validate = (payload: TestExecutionResult) =>
    Object.keys(payload).every((key) =>
      ["id", "meta", "cy", "rr", "har", "pluginMeta", "browserLogs"].includes(
        key
      )
    );

  const handleClick = () => {
    setOrigin(null);
    handleDataChange(null);
    clearParam();
  };

  const handleFileChange = ({
    filename,
    payload,
  }: {
    filename: string | null;
    payload: TestExecutionResult | null;
  }) => {
    setOrigin(filename);
    handleDataChange(payload);
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (origin) {
    return (
      <div className={styles["selected-file"]}>
        Payload from:&nbsp;<span>{origin}</span>&nbsp;
        <button type="button" onClick={handleClick}>
          Remove
        </button>
      </div>
    );
  }

  return <JsonFileUpload onChange={handleFileChange} validate={validate} />;
}
