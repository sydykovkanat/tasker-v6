import { useGetTasks } from '@/features/task/hooks';

import { ErrorBlock, Loading } from '@/shared/components/shared';

export function Calendar() {
	const { tasks, isTasksLoading } = useGetTasks();

	if (isTasksLoading) {
		return <Loading />;
	}

	if (!tasks) {
		return <ErrorBlock />;
	}

	return (
		<div className={'flex min-h-screen items-center justify-center'}>
			<h1 className={'text-muted-foreground text-2xl'}>Скоро :)</h1>
		</div>
	);
}
