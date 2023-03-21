import { useEffect, useState } from "react";
import { usePayloadFetcher } from "../../hooks/usePayloadFetcher";
import {
  CypressStep,
  HttpArchiveLog,
  Payload,
  ReplayerStepData,
} from "../../types";
import { JsonFileUpload } from "../FileUpload/FileUpload";
import styles from "./PayloadHandler.module.scss";

export function PayloadHandler({
  setSteps,
  setReplayerData,
  setHttpArchiveLog,
}: {
  setSteps: (steps: CypressStep[]) => void;
  setReplayerData: (data: ReplayerStepData[]) => void;
  setHttpArchiveLog: (data: HttpArchiveLog | null) => void;
}) {
  const [payloadOrigin, setPayloadOrigin] = useState<string | null>(null);

  usePayloadFetcher({
    onData: ({ payload, param }: { payload: Payload; param: string }) => {
      if (validate(payload)) {
        handleDataChange(payload);
        setPayloadOrigin(param);
      } else {
        console.error("Invalid payload URL");
      }
    },
  });

  const handleDataChange = (payload: Payload | null) => {
    setSteps(payload?.cy || []);
    setReplayerData(payload?.rr || []);
    setHttpArchiveLog(payload?.har || null);
  };

  const validate = (payload: Payload) =>
    Object.keys(payload).every((key) => ["cy", "rr", "har"].includes(key));

  const handleClick = () => {
    setPayloadOrigin(null);
    handleDataChange(null);
  };

  const handleFileChange = ({
    filename,
    payload,
  }: {
    filename: string | null;
    payload: Payload | null;
  }) => {
    setPayloadOrigin(filename);
    handleDataChange(payload);
  };

  if (payloadOrigin) {
    return (
      <div className={styles["selected-file"]}>
        Payload from:&nbsp;<span>{payloadOrigin}</span>&nbsp;
        <button type="button" onClick={handleClick}>
          Remove
        </button>
      </div>
    );
  }

  return <JsonFileUpload onChange={handleFileChange} validate={validate} />;
}
