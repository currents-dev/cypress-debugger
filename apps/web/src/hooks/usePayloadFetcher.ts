import { TestExecutionResult } from 'cypress-debugger';
import { useEffect } from 'react';
import isValidUrl from '../utils/isValidUrl';
import { usePayloadQueryParam } from './useQuery';

function usePayloadFetcher({
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
  const [param] = usePayloadQueryParam();

  useEffect(() => {
    const trimmedParam = param?.trim();

    if (!trimmedParam) return;

    if (!isValidUrl(trimmedParam)) {
      // eslint-disable-next-line no-console
      console.error('Invalid url');
      return;
    }

    onLoading(true);
    fetch(new URL(trimmedParam))
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to load the data');
        }

        return res.json();
      })
      .then((result) => {
        onData({
          payload: result,
          param: trimmedParam,
        });
      })
      // eslint-disable-next-line no-console
      .catch(console.error)
      .finally(() => {
        onLoading(false);
      });
  }, [param]);
}

export default usePayloadFetcher;
