import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { ProjectSchemaType } from '@/features/project/schemas';
import { projectService } from '@/features/project/services';

export function useCreateProject() {
	const queryClient = useQueryClient();

	const { mutate: createProject, isPending: isProjectCreateLoading } =
		useMutation({
			mutationKey: ['create project'],
			mutationFn: async (body: ProjectSchemaType) =>
				await projectService.create(body),
			onSuccess: async () => {
				await queryClient.invalidateQueries({ queryKey: ['projects'] });
				toast.success('Проект успешно создан');
			},
			onError: () => {
				toast.error('Не удалось создать проект');
			},
		});

	return { createProject, isProjectCreateLoading };
}
