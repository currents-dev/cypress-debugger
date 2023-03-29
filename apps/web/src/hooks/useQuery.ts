import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const createUseQueryParams =
  (param: string) =>
  (): [string | null, (value: string) => void, () => void] => {
    const [_param, _setParam] = useState<string | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();

    const setParam = (value: string) => {
      searchParams.set(param, value);
      setSearchParams(searchParams);
    };

    const clearParam = () => {
      if (searchParams.has(param)) {
        searchParams.delete(param);
        setSearchParams(searchParams);
      }
    };

    useEffect(() => {
      _setParam(searchParams.get(param));
    }, [searchParams]);

    return [_param, setParam, clearParam];
  };

export const usePayloadQueryParam = createUseQueryParams("payload");
