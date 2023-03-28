import { TestExecutionResult } from "@currents/cypress-debugger-plugin";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { isValidUrl } from "../utils/isValidUrl";

export function usePayloadFetcher({
  onData,
  onLoading,
}: {
  onData: ({
    payload,
    param,
  }: {
    payload: TestExecutionResult;
    param: string;
  }) => void;
  onLoading: (loading: boolean) => void;
}) {
  const { payload } = useParams();

  useEffect(() => {
    const param = Array.isArray(payload) ? payload[0] : payload;
    const trimmedParam = param?.trim();

    if (!trimmedParam) return;

    if (!isValidUrl(trimmedParam)) {
      console.error("Invalid url");
      return;
    }

    onLoading(true);
    fetch(new URL(trimmedParam))
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load the data");
        }

        return res.json();
      })
      .then((result) => {
        onData({
          payload: result,
          param: trimmedParam,
        });
      })
      .catch(console.error)
      .finally(() => {
        onLoading(false);
      });
  }, [payload]);
}
