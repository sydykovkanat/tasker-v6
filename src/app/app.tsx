import { Route, Routes } from 'react-router-dom';

import { useAuthStore } from '@/features/auth/store';

import { Layout } from '@/shared/components/shared';

import {
	Auth,
	Calendar,
	FilteredTasks,
	Home,
	NotFound,
	OneTask,
	Projects,
	Statistics,
	Subordinates,
	Tags,
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
				<Route path={'/tasks/new'} element={<FilteredTasks statusId={1} />} />
				<Route
					path={'/tasks/in-progress'}
					element={<FilteredTasks statusId={2} />}
				/>
				<Route
					path={'/tasks/completed'}
					element={<FilteredTasks statusId={3} />}
				/>
				<Route
					path={'/tasks/rejected'}
					element={<FilteredTasks statusId={4} />}
				/>
				<Route path={'/tasks/:id'} element={<OneTask />} />
				<Route path={'/projects'} element={<Projects />} />
				<Route path={'/calendar'} element={<Calendar />} />
				<Route path={'/subordinates'} element={<Subordinates />} />
				<Route path={'/statistics'} element={<Statistics />} />
				<Route path={'/tags'} element={<Tags />} />
				<Route path={'*'} element={<NotFound />} />
			</Routes>
		</Layout>
	);
}
