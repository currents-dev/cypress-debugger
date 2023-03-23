import { createContext, PropsWithChildren, useContext, useState } from "react";
import { ReplayerStepData } from "../types";

export type ReplayerContextType = {
  origin: null | string;
  setOrigin: (origin: ReplayerContextType["origin"]) => void;
  playerData: ReplayerStepData[];
  setReplayerData: (data: ReplayerStepData[]) => void;
};

const ReplayerContext = createContext<ReplayerContextType>({
  origin: null,
  setOrigin: () => {},
  playerData: [],
  setReplayerData: () => {},
});

export const useReplayerContext = () => useContext(ReplayerContext);

export default function ReplayerContextProvider({
  children,
}: PropsWithChildren<unknown>) {
  const [origin, setOrigin] = useState<ReplayerContextType["origin"]>(null);
  const [playerData, setReplayerData] = useState<ReplayerStepData[]>([]);

  return (
    <ReplayerContext.Provider
      value={{
        origin,
        setOrigin,

        setReplayerData,
        playerData,
      }}
    >
      {children}
    </ReplayerContext.Provider>
  );
}
