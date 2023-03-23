import { useState } from "react";
import { useReplayerContext } from "../../context/replayer";
import { usePayloadFetcher } from "../../hooks/usePayloadFetcher";
import { CypressStep, HttpArchiveLog, Payload } from "../../types";
import { JsonFileUpload } from "../FileUpload/FileUpload";
import styles from "./PayloadHandler.module.scss";

export function PayloadHandler({
  setSteps,
  setHttpArchiveLog,
}: {
  setSteps: (steps: CypressStep[]) => void;
  setHttpArchiveLog: (data: HttpArchiveLog | null) => void;
}) {
  const [loading, setLoading] = useState(false);

  const { origin, setOrigin, setReplayerData } = useReplayerContext();

  usePayloadFetcher({
    onData: ({ payload, param }: { payload: Payload; param: string }) => {
      if (validate(payload)) {
        handleDataChange(payload);
        setOrigin(param);
      } else {
        console.error("Invalid payload URL");
      }
    },
    onLoading: setLoading,
  });

  const handleDataChange = (payload: Payload | null) => {
    setSteps(payload?.cy || []);
    setReplayerData(payload?.rr || []);
    setHttpArchiveLog(payload?.har || null);
  };

  const validate = (payload: Payload) =>
    Object.keys(payload).every((key) => ["cy", "rr", "har"].includes(key));

  const handleClick = () => {
    setOrigin(null);
    handleDataChange(null);
  };

  const handleFileChange = ({
    filename,
    payload,
  }: {
    filename: string | null;
    payload: Payload | null;
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
