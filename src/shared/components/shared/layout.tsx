import { PropsWithChildren } from 'react';

import { Sidebar } from '@/widgets/sidebar/components';

export function Layout({ children }: PropsWithChildren) {
	return (
		<main className={'flex min-h-screen'}>
			<Sidebar />

			<div className={'relative w-full'}>{children}</div>
		</main>
	);
}
