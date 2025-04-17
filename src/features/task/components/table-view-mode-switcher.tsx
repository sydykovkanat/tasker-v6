import { useTaskStore } from '@/features/task/store';

import { Label, Switch } from '@/shared/components/ui';

export function TableViewModeSwitcher() {
	const { setViewMode, viewMode } = useTaskStore();

	const isTableViewMode = viewMode === 'table';

	return (
		<div className='flex items-center space-x-2'>
			<Switch
				id='table-mode'
				checked={isTableViewMode}
				onCheckedChange={(v) => {
					setViewMode(v ? 'table' : 'kanban');
				}}
			/>
			<Label htmlFor='table-mode'>Табличный режим</Label>
		</div>
	);
}
