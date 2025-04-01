import { type PropsWithChildren } from 'react';

import { Toaster } from '@/shared/components/ui';
import { TanstackQueryProvider } from '@/shared/providers';

export function Providers({ children }: PropsWithChildren) {
	return (
		<TanstackQueryProvider>
			{children}

			<Toaster />
		</TanstackQueryProvider>
	);
}
