import { Layout } from "../components";
import CypressStepsContextProvider from "../context/cypressSteps";
import HttpArchiveContextProvider from "../context/httpArchiveEntries";
import PlaybackProvider from "../context/playback";
import ReplayerContextProvider from "../context/replayer";

export default function Web() {
  return (
    <CypressStepsContextProvider>
      <ReplayerContextProvider>
        <HttpArchiveContextProvider>
          <PlaybackProvider>
            <Layout />
          </PlaybackProvider>
        </HttpArchiveContextProvider>
      </ReplayerContextProvider>
    </CypressStepsContextProvider>
  );
}
