import { orderBy } from "lodash";
import { useEffect, useState } from "react";
import _replayerData from "../data/rr.json";
import { ReplayerStepData } from "../types";

export function useReplayerData() {
  const [replayerData, setReplayerData] = useState<ReplayerStepData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setReplayerData(orderBy(_replayerData, "timestamp", "asc"));
    setLoading(false);
  }, []);

  return {
    replayerData,
    loading,
  };
}
