/* eslint-disable import/prefer-default-export */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const createUseQueryParams =
  (queryParam: string) =>
  (): [string | null, (value: string) => void, () => void] => {
    const [paramValue, setParamValue] = useState<string | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const setParam = (value: string) => {
      searchParams.set(queryParam, value);
      setSearchParams(searchParams);
    };

    const clearParam = () => {
      if (searchParams.has(queryParam)) {
        searchParams.delete(queryParam);
        setSearchParams(searchParams);
      }
    };

    useEffect(() => {
      setParamValue(searchParams.get(queryParam));
    }, [searchParams]);

    return [paramValue, setParam, clearParam];
  };

export const usePayloadQueryParam = createUseQueryParams('payload');
