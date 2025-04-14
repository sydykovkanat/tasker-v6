import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ProjectSchemaType } from '@/features/project/schemas';
import { projectService } from '@/features/project/services';

export function useEditProject(projectId: number) {
	const queryClient = useQueryClient();

	const { mutate: updateProject, isPending: isProjectUpdateLoading } =
		useMutation({
			mutationKey: ['edit project', projectId],
			mutationFn: async (body: ProjectSchemaType) =>
				await projectService.update(projectId, body),
			onSuccess: async () => {
				await queryClient.invalidateQueries({ queryKey: ['projects'] });
				toast.success('Проект успешно обновлён', {
					description: 'Данные проекта были успешно обновлены',
				});
			},
			onError: () => {
				toast.error('Не удалось обновить проект', {
					description: 'Проект не был обновлён, попробуйте позже',
				});
			},
		});

	return { updateProject, isProjectUpdateLoading };
}
