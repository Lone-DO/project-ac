import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from '@/app/store.ts';

import 'normalize.css';

import App from './app/index.tsx';
import { StrictMode } from 'react';

const root = document.getElementById('root');
if (!root) throw new Error('No root element found');

createRoot(root).render(
	<StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</StrictMode>,
);
