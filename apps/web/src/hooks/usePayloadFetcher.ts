import { useToast } from '@/components/ui/useToast';
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
  const { toast } = useToast();

  useEffect(() => {
    const trimmedParam = param?.trim();

    if (!trimmedParam) return;

    if (!isValidUrl(trimmedParam)) {
      // eslint-disable-next-line no-console
      console.error('Invalid url');
      toast({
        title: 'Error',
        description: 'Invalid url',
      });
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
        toast({
          title: 'Success',
          description: 'Data successfully loaded',
        });

        onData({
          payload: result,
          param: trimmedParam,
        });
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err);
        toast({
          title: 'Error',
          description: 'Failed to load the data',
        });
      })
      .finally(() => {
        onLoading(false);
      });
  }, [param]); // eslint-disable-line react-hooks/exhaustive-deps
}

export default usePayloadFetcher;
