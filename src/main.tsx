import { createRoot } from 'react-dom/client';
import 'normalize.css';

import App from './app/index.tsx';

const root = document.getElementById('root');
if (!root) throw new Error('No root element found');

createRoot(root).render(<App />);
