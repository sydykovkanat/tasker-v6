import { useQuery } from '@tanstack/react-query';

import { projectService } from '@/features/project/services';

export function useGetProjects() {
	const { data: projects, isLoading: isProjectsLoading } = useQuery({
		queryKey: ['projects'],
		queryFn: async () => await projectService.getAll(),
	});

	return { projects, isProjectsLoading };
}
