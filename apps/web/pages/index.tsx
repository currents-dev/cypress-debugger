import { Layout } from "../components";
import CypresEventsContextProvider from "../context/cypressEvents";
import HttpArchiveContextProvider from "../context/httpArchiveEntries";
import PlaybackProvider from "../context/playback";
import ReplayerContextProvider from "../context/replayer";

export default function Web() {
  console.log("Test log");
  return (
    <CypresEventsContextProvider>
      <ReplayerContextProvider>
        <HttpArchiveContextProvider>
          <PlaybackProvider>
            <Layout />
          </PlaybackProvider>
        </HttpArchiveContextProvider>
      </ReplayerContextProvider>
    </CypresEventsContextProvider>
  );
}
