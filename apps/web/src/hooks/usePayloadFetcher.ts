import { TestExecutionResult } from "@currents/cypress-debugger-plugin";
import { useSearchParams } from "react-router-dom";
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
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const param = searchParams.get('payload');
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
  }, [searchParams]);
}
