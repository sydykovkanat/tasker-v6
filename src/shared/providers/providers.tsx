import { type PropsWithChildren } from 'react';

import { Toaster } from '@/shared/components/ui';
import { TanstackQueryProvider, ThemeProvider } from '@/shared/providers';

export function Providers({ children }: PropsWithChildren) {
	return (
		<TanstackQueryProvider>
			<ThemeProvider defaultTheme='light' storageKey='tasker-ui-theme'>
				{children}

				<Toaster
					toastOptions={{
						style: {
							borderRadius: 'var(--radius)',
						},
					}}
				/>
			</ThemeProvider>
		</TanstackQueryProvider>
	);
}
