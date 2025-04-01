export interface IProject {
	id: number;
	name: string;
	description: string;
	responsiblePersonName: string;
	department: {
		id: number;
		departmentName: string;
	};
	createdAt: string;
	updatedAt: string;
}
