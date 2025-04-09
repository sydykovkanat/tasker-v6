import { useQuery } from '@tanstack/react-query';

import { historyService } from '@/features/history/services';

export function useGetTaskHistory(id: number, isOpen: boolean) {
	const { data: history, isLoading: isHistoryLoading } = useQuery({
		queryKey: ['history history', id],
		queryFn: async () => await historyService.getTaskHistoryById(id),
		enabled: isOpen,
	});

	return { history, isHistoryLoading };
}
