import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { Providers } from '@/shared/providers';

import './shared/styles';
import { App } from '@/app';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<Providers>
				<App />
			</Providers>
		</BrowserRouter>
	</StrictMode>,
);
