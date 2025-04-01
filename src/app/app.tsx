import { Route, Routes } from 'react-router-dom';

import { useAuthStore } from '@/features/auth/store';

import { Layout } from '@/shared/components/shared';

import {
	Auth,
	Calendar,
	Home,
	NotFound,
	Projects,
	Subordinates,
} from '@/pages';

export function App() {
	const isAuthenticated = useAuthStore((state) => state.isLoggedIn);

	if (!isAuthenticated) {
		return <Auth />;
	}

	return (
		<Layout>
			<Routes>
				<Route path={'/'} element={<Home />} />
				<Route path={'/projects'} element={<Projects />} />
				<Route path={'/calendar'} element={<Calendar />} />
				<Route path={'/subordinates'} element={<Subordinates />} />
				<Route path={'*'} element={<NotFound />} />
			</Routes>
		</Layout>
	);
}
