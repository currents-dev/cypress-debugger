import { useSearchParams } from "react-router-dom";

const createUseQueryParams = (param: string) => () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParam = () => searchParams.get(param);

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

  return {
    getParam,
    setParam,
    clearParam,
  };
};

export const usePayloadQueryParam = createUseQueryParams("payload");
