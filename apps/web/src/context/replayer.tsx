import { RRWebEvent } from 'cypress-debugger';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

export type ReplayerContextType = {
  origin: null | string;
  setOrigin: (origin: ReplayerContextType['origin']) => void;
  playerData: RRWebEvent[];
  setReplayerData: (data: RRWebEvent[]) => void;
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
  const [origin, setOrigin] = useState<ReplayerContextType['origin']>(null);
  const [playerData, setReplayerData] = useState<RRWebEvent[]>([]);

  return (
    <ReplayerContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
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
