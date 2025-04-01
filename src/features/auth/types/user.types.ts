export interface IPerson {
	id: number;
	name: string;
	avatar: string | null;
}

export interface IUser extends IPerson {
	email: string;
	token: string;
	roles: string[];
	departmentId: number | null;
}
