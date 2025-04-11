import { useAuthStore } from '@/features/auth/store';
import { IProject } from '@/features/project/types';
import { ISubordinate } from '@/features/subordinate/types';

import {
	Input,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/components/ui';
import { formatStatus } from '@/shared/lib';

interface Props {
	projects?: IProject[];
	projectId?: string;
	onProjectChange: (projectId: string) => void;
	subordinates: ISubordinate[];
	onSubordinateChange: (performerId: string) => void;
	performerId?: string;
	statusId?: string;
	onStatusChange?: (statusId: string) => void;
	isStatusDisabled?: boolean;
}

export function TasksFilters({
	projects,
	projectId,
	onProjectChange,
	subordinates,
	onSubordinateChange,
	performerId,
	statusId,
	onStatusChange,
	isStatusDisabled,
}: Props) {
	const user = useAuthStore((state) => state.user);
	const isAdmin = user?.roles.includes('ADMIN');

	return (
		<div className={'grid grid-cols-5 gap-x-4 px-4 pt-4'}>
			<Input placeholder={'Поиск...'} />

			<Select
				disabled={!projects}
				value={projectId}
				onValueChange={onProjectChange}
			>
				<SelectTrigger size={'lg'} className={'w-full'}>
					<SelectValue
						placeholder={projects ? 'Выберите проект' : 'Нет проектов'}
					/>
				</SelectTrigger>

				<SelectContent>
					<SelectItem value={'all'}>Все проекты</SelectItem>

					{projects?.map((project) => (
						<SelectItem key={project.id} value={project.id.toString()}>
							{project.name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>

			{isAdmin && (
				<Select
					disabled={!subordinates}
					value={performerId}
					onValueChange={onSubordinateChange}
				>
					<SelectTrigger size={'lg'} className={'w-full'}>
						<SelectValue
							placeholder={projects ? 'Выберите сотрудника' : 'Нет сотрудников'}
						/>
					</SelectTrigger>

					<SelectContent>
						<SelectItem value={'all'}>Все сотрудники</SelectItem>

						{subordinates?.map((subordinate) => (
							<SelectItem
								key={subordinate.id}
								value={subordinate.id.toString()}
							>
								{subordinate.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			)}

			{!isStatusDisabled && (
				<Select value={statusId} onValueChange={onStatusChange}>
					<SelectTrigger size={'lg'} className={'w-full'}>
						<SelectValue placeholder={'Выберите статус'} />
					</SelectTrigger>

					<SelectContent>
						<SelectItem value={'all'}>Все статусы</SelectItem>

						{[1, 2, 3].map((status) => (
							<SelectItem key={status} value={status.toString()}>
								{formatStatus(status).label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			)}
		</div>
	);
}
