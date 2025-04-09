import { useQuery } from '@tanstack/react-query';

import { userService } from '@/features/user/services';

export function useGetUsersByDepartment(departmentId: string) {
	const { data: users, isLoading: isUsersLoading } = useQuery({
		queryKey: ['users', departmentId],
		queryFn: async () => await userService.getAllByDepartment(departmentId),
		enabled: departmentId !== 'undefined',
	});

	return {
		users,
		isUsersLoading,
	};
}
