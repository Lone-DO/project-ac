import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from '@/app/store.ts';

import 'normalize.css';

import App from './app/index.tsx';

const root = document.getElementById('root');
if (!root) throw new Error('No root element found');

createRoot(root).render(
	<Provider store={store}>
		<App />
	</Provider>,
);
