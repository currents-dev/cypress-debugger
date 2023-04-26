import { createContext, PropsWithChildren, useContext } from 'react';
import { useCypressEventsContext } from './cypressEvents';

interface PlaybackContextType {
  rrIdOrTs: string | number | null;
}
const PlaybackContext = createContext<PlaybackContextType>({
  rrIdOrTs: null,
});
export const usePlayback = () => useContext(PlaybackContext);

export default function PlaybackProvider({
  children,
}: PropsWithChildren<unknown>) {
  const {
    beforeAfter,
    selectedEventObject: event,
    events,
  } = useCypressEventsContext();

  const rrIdOrTs =
    (event
      ? events.find((s) => s.id === event.id)?.meta[beforeAfter].rrId
      : null) ??
    event?.timestamp ??
    null;

  return (
    <PlaybackContext.Provider
      value={{
        rrIdOrTs,
      }}
    >
      {children}
    </PlaybackContext.Provider>
  );
}
