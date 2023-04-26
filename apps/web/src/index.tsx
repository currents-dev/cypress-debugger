import { createRoot } from 'react-dom/client';
import 'rrweb-player/dist/style.css';
import App from './App';
import './index.css';

createRoot(document.getElementById('root') as HTMLElement).render(<App />);
