import { useEffect, useState } from "react";
import _httpArchiveLog from "../data/har.json";
import { HttpArchiveLog } from "../types";

export function useHttpArchiveLog() {
  const [httpArchiveLog, setHttpArchiveLog] = useState<HttpArchiveLog | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setHttpArchiveLog(_httpArchiveLog);
    setLoading(false);
  }, []);

  return {
    httpArchiveLog,
    setHttpArchiveLog,
    loading,
  };
}
