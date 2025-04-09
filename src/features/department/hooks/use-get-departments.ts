import { useQuery } from '@tanstack/react-query';

import { departmentService } from '@/features/department/services';

export function useGetDepartments() {
	const { data: departments, isLoading: isDepartmentsLoading } = useQuery({
		queryKey: ['departments'],
		queryFn: async () => await departmentService.getAll(),
	});

	return {
		departments,
		isDepartmentsLoading,
	};
}
