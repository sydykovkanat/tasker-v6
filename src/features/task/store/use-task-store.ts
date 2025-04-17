import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type IViewMode = 'table' | 'kanban';

interface Store {
	viewMode: IViewMode;
	setViewMode: (viewMode: IViewMode) => void;
}

export const useTaskStore = create<Store>()(
	persist(
		(set) => ({
			viewMode: 'kanban',
			setViewMode: (viewMode: IViewMode) => set({ viewMode }),
		}),
		{
			name: 'task-view-mode',
		},
	),
);
