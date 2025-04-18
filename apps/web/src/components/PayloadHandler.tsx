import { TestExecutionResult } from 'cypress-debugger';
import { Loader2 } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useCypressEventsContext } from '../context/cypressEvents';
import { useHttpArchiveContext } from '../context/httpArchiveEntries';
import { useReplayerContext } from '../context/replayer';
import usePayloadFetcher from '../hooks/usePayloadFetcher';
import { usePayloadQueryParam } from '../hooks/useQuery';
import JsonFileUpload from './JsonFileUpload';

function PayloadHandler() {
  const [loading, setLoading] = useState(false);

  const { origin, setOrigin, setReplayerData } = useReplayerContext();

  const { setHttpArchiveLog } = useHttpArchiveContext();

  const { setEvents, setMeta, setBrowserLogs } = useCypressEventsContext();

  const [queryParam] = usePayloadQueryParam();

  const validate = (payload: TestExecutionResult) =>
    Object.keys(payload).every((key) =>
      ['id', 'meta', 'cy', 'rr', 'har', 'pluginMeta', 'browserLogs'].includes(
        key
      )
    );

  const handleDataChange = useCallback(
    (payload: TestExecutionResult | null) => {
      setEvents(payload?.cy || []);
      setReplayerData(payload?.rr || []);
      setHttpArchiveLog(payload?.har || null);
      setMeta(payload?.meta ?? null);
      setBrowserLogs(payload?.browserLogs || null);
    },
    [setEvents, setReplayerData, setHttpArchiveLog, setMeta, setBrowserLogs]
  );

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
        // eslint-disable-next-line no-console
        console.error('Invalid payload URL');
      }
    },
    onLoading: setLoading,
  });

  useEffect(() => {
    if (!queryParam) {
      setOrigin(null);
      handleDataChange(null);
    }
  }, [queryParam]); // eslint-disable-line

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).trace) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      // handleDataChange((window as any).trace);
      // parse base64
      const str = (window as any).trace;
      const payload = JSON.parse(str);
      handleDataChange(payload);
      setOrigin('trace');
    }
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="animate-spin" size="48" strokeWidth="1.5" />
      </div>
    );
  }

  if (origin) {
    return null;
  }

  return <JsonFileUpload onChange={handleFileChange} validate={validate} />;
}

export default PayloadHandler;
