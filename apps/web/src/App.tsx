import { Toaster } from '@/components/ui/Toaster';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CypresEventsContextProvider from './context/cypressEvents';
import HttpArchiveContextProvider from './context/httpArchiveEntries';
import PlaybackProvider from './context/playback';
import ReplayerContextProvider from './context/replayer';
import { useDarkMode } from './components/ui/useDarkMode';
import Layout from './components/Layout';

export default function App() {

  const [isDark] = useDarkMode()

  return (
    <Router>
      <div aria-readonly={isDark}>
        <CypresEventsContextProvider>
          <ReplayerContextProvider>
            <HttpArchiveContextProvider>
              <PlaybackProvider>
                <Routes>
                  <Route path="/" element={<Layout />} />
                </Routes>
                <Toaster />
              </PlaybackProvider>
            </HttpArchiveContextProvider>
          </ReplayerContextProvider>
        </CypresEventsContextProvider>
      </div>
    </Router>
  );
}
