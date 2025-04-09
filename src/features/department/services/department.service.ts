import { IDepartment } from '@/features/department/types';

import { instance } from '@/shared/api';

class DepartmentService {
	async getAll() {
		return (
			await instance<IDepartment[]>({
				method: 'GET',
				url: '/department',
			})
		).data;
	}
}

export const departmentService = new DepartmentService();
