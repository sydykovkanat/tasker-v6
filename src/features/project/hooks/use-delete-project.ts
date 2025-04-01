import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { projectService } from '@/features/project/services';

export function useDeleteProject() {
	const queryClient = useQueryClient();

	const { mutate: deleteProject, isPending: isProjectDeleteLoading } =
		useMutation({
			mutationKey: ['delete project'],
			mutationFn: async (projectId: number) =>
				await projectService.delete(projectId),
			onSuccess: async () => {
				await queryClient.invalidateQueries({ queryKey: ['projects'] });
				toast.success('Проект успешно удален');
			},
			onError: () => {
				toast.error('Не удалось удалить проект');
			},
		});

	return { deleteProject, isProjectDeleteLoading };
}
