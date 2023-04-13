import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import CypresEventsContextProvider from './context/cypressEvents';
import HttpArchiveContextProvider from './context/httpArchiveEntries';
import PlaybackProvider from './context/playback';
import ReplayerContextProvider from './context/replayer';

export default function App() {
  return (
    <Router>
      <CypresEventsContextProvider>
        <ReplayerContextProvider>
          <HttpArchiveContextProvider>
            <PlaybackProvider>
              <Routes>
                <Route path="/" element={<Layout />} />
              </Routes>
            </PlaybackProvider>
          </HttpArchiveContextProvider>
        </ReplayerContextProvider>
      </CypresEventsContextProvider>
    </Router>
  );
}
