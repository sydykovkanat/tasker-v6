import { Check, ChevronsUpDown } from 'lucide-react';

import { useAuthStore } from '@/features/auth/store';
import { IProject } from '@/features/project/types';
import { ISubordinate } from '@/features/subordinate/types';

import {
	Button,
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	Input,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/components/ui';
import { formatStatus } from '@/shared/lib';
import { cn } from '@/shared/utils';

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
	query: string;
	onQueryChange: (query: string) => void;
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
	query,
	onQueryChange,
}: Props) {
	const user = useAuthStore((state) => state.user);
	const isAdmin = user?.roles.includes('ADMIN');
	const selectedPerformerName =
		performerId === 'all'
			? 'Все исполнители'
			: subordinates.find(
					(subordinate) => subordinate.id.toString() === performerId,
				)?.name;

	return (
		<div className={'grid grid-cols-5 gap-x-4 px-4 pt-4'}>
			<Input
				placeholder={'Поиск...'}
				value={query}
				onChange={(e) => onQueryChange(e.target.value)}
			/>

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
				<Popover>
					<PopoverTrigger asChild>
						<Button
							variant='outline'
							role='combobox'
							size={'lg'}
							className='justify-between font-normal'
						>
							{selectedPerformerName || 'Выберите исполнителя'}
							<ChevronsUpDown className='opacity-35' />
						</Button>
					</PopoverTrigger>
					<PopoverContent className='w-[400px] p-0'>
						<Command>
							<CommandInput placeholder='Search framework...' className='h-9' />
							<CommandList>
								<CommandEmpty>Исполнители не найдены.</CommandEmpty>
								<CommandGroup>
									<CommandItem
										value={'all'}
										onSelect={(currentValue) => {
											onSubordinateChange(currentValue);
										}}
										className={'justify-start text-start'}
									>
										Все исполнители
										<Check
											className={cn(
												'ml-auto',
												performerId === 'all' ? 'opacity-100' : 'opacity-0',
											)}
										/>
									</CommandItem>

									{subordinates.map((subordinate) => (
										<CommandItem
											className={'truncate text-nowrap'}
											key={subordinate.id}
											value={subordinate.name}
											onSelect={(currentValue) => {
												const selectedPerformerId = subordinates.find(
													(subordinate) => subordinate.name === currentValue,
												)?.id;
												if (selectedPerformerId) {
													onSubordinateChange(selectedPerformerId.toString());
												}
											}}
										>
											{subordinate.name}
											<Check
												className={cn(
													'ml-auto',
													performerId === subordinate.id.toString()
														? 'opacity-100'
														: 'opacity-0',
												)}
											/>
										</CommandItem>
									))}
								</CommandGroup>
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>
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
