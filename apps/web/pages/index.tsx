import { Layout } from "../components";
import CypressStepsContextProvider from "../context/cypressSteps";
import HttpArchiveContextProvider from "../context/httpArchiveEntries";
import ReplayerContextProvider from "../context/replayer";

export default function Web() {
  return (
    <CypressStepsContextProvider>
      <ReplayerContextProvider>
        <HttpArchiveContextProvider>
          <Layout />
        </HttpArchiveContextProvider>
      </ReplayerContextProvider>
    </CypressStepsContextProvider>
  );
}
