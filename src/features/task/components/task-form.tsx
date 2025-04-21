import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { useAuthStore } from '@/features/auth/store';
import { useGetProjects } from '@/features/project/hooks';
import { TaskSchema, TaskSchemaType } from '@/features/task/schemas';
import { useGetUsersByDepartment } from '@/features/user/hooks';

import {
	IconCancel,
	IconDelete,
	IconNoteEdit,
} from '@/shared/components/shared';
import {
	Avatar,
	Button,
	Calendar,
	DialogClose,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Textarea,
} from '@/shared/components/ui';
import { date } from '@/shared/lib';
import { cn } from '@/shared/utils';

interface Props {
	onSubmit: (data: TaskSchemaType) => void;
	isLoading: boolean;
	type?: 'create' | 'edit';
	defaultValues?: {
		taskName?: string;
		description?: string;
		departmentId?: string;
		performerId?: string[];
		projectId?: string;
		priorityId?: string;
		dates?: {
			from: Date;
			to: Date;
		};
	};
}

export function TaskForm({ onSubmit, isLoading, defaultValues, type }: Props) {
	const user = useAuthStore((state) => state.user);

	const form = useForm<TaskSchemaType>({
		resolver: zodResolver(TaskSchema),
		defaultValues: {
			taskName: defaultValues?.taskName,
			description: defaultValues?.description ?? '',
			departmentId: defaultValues?.departmentId
				? defaultValues?.departmentId
				: user && user.departmentId
					? user.departmentId.toString()
					: 'undefined',
			performerId: defaultValues?.performerId ?? ['undefined'],
			projectId: defaultValues?.projectId ?? 'undefined',
			priorityId: defaultValues?.priorityId ?? '1',
			dates: defaultValues?.dates ?? {
				from: new Date(),
				to: new Date(),
			},
		},
	});

	const dates = form.watch('dates');

	const { projects, isProjectsLoading } = useGetProjects();
	// const { departments, isDepartmentsLoading } = useGetDepartments();
	const { users, isUsersLoading } = useGetUsersByDepartment(
		form.watch('departmentId'),
	);

	const handleSubmit = (data: TaskSchemaType) => {
		onSubmit(data);
		form.reset();
	};

	const selectedUsers = form
		.watch('performerId')
		?.filter((id) => id !== 'undefined')
		.map((id) => {
			const user = users?.find((user) => user.id.toString() === id);

			return {
				name: user?.name,
				id: user?.id,
			};
		});
	const notSelectedUsers = users?.filter((user) => {
		return (
			selectedUsers &&
			!selectedUsers.some((selectedUser) => selectedUser.id === user.id)
		);
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className={'space-y-4'}>
				<div className={'flex gap-4'}>
					<div className={'flex flex-1 flex-col gap-4'}>
						<FormField
							control={form.control}
							name={'taskName'}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Название</FormLabel>

									<FormControl>
										<Input
											disabled={isLoading}
											placeholder={'Название задачи'}
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name={'description'}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Описание</FormLabel>

									<FormControl>
										<Textarea
											disabled={isLoading}
											className={'h-60 resize-none'}
											placeholder={'Подробное описание задачи'}
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						{type === 'create' && (
							<FormField
								control={form.control}
								name={'dates'}
								render={({ field }) => (
									<FormItem>
										<FormLabel>Сроки выполнения</FormLabel>

										<FormControl>
											<Popover modal={true}>
												<PopoverTrigger asChild disabled={isLoading}>
													<Button
														disabled={isLoading}
														size={'lg'}
														id='date'
														variant={'outline'}
														className={'justify-start font-normal capitalize'}
													>
														<CalendarIcon />
														{dates?.from ? (
															dates?.to ? (
																<>
																	{date(dates?.from, 'LLL dd, y')} -{' '}
																	{date(dates?.to, 'LLL dd, y')}
																</>
															) : (
																date(dates?.from, 'LLL dd, y')
															)
														) : (
															<span
																className={'lowercase first-letter:uppercase'}
															>
																Выберите даты выполнения задачи
															</span>
														)}
													</Button>
												</PopoverTrigger>
												<PopoverContent className='w-auto p-0' align='start'>
													<Calendar
														initialFocus
														mode='range'
														defaultMonth={dates?.from}
														selected={dates}
														onSelect={field.onChange}
														disabled={(date) => {
															const today = new Date();
															today.setHours(0, 0, 0, 0);
															return date < today;
														}}
														numberOfMonths={2}
													/>
												</PopoverContent>
											</Popover>
										</FormControl>

										<FormMessage />
									</FormItem>
								)}
							/>
						)}
					</div>

					<div className={'flex flex-1 flex-col gap-4'}>
						<FormField
							control={form.control}
							name={'projectId'}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Проект</FormLabel>

									<FormControl>
										<Select
											value={field.value}
											onValueChange={field.onChange}
											disabled={isLoading}
										>
											<SelectTrigger size={'lg'} className={'w-full'}>
												<SelectValue placeholder={'Выберите проект'} />
											</SelectTrigger>

											<SelectContent>
												{isProjectsLoading ? (
													<SelectItem value={'undefined'} disabled>
														Загрузка проектов...
													</SelectItem>
												) : projects && projects.length === 0 ? (
													<SelectItem value={'undefined'} disabled>
														Нет доступных проектов
													</SelectItem>
												) : (
													projects && (
														<>
															<SelectItem value={'undefined'}>
																Не выбрано
															</SelectItem>

															{projects.map((project) => (
																<SelectItem
																	value={project.id.toString()}
																	key={project.id}
																>
																	{project.name}
																</SelectItem>
															))}
														</>
													)
												)}
											</SelectContent>
										</Select>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>

						{/*<FormField*/}
						{/*	control={form.control}*/}
						{/*	name={'departmentId'}*/}
						{/*	render={({ field }) => (*/}
						{/*		<FormItem>*/}
						{/*			<FormLabel>Отдел</FormLabel>*/}

						{/*			<FormControl>*/}
						{/*				<Select*/}
						{/*					value={field.value}*/}
						{/*					onValueChange={(v) => {*/}
						{/*						field.onChange(v);*/}
						{/*						form.setValue('performerId', ['undefined']);*/}
						{/*					}}*/}
						{/*					disabled={isLoading}*/}
						{/*				>*/}
						{/*					<SelectTrigger size={'lg'} className={'w-full'}>*/}
						{/*						<SelectValue placeholder={'Выберите отдел'} />*/}
						{/*					</SelectTrigger>*/}

						{/*					<SelectContent>*/}
						{/*						{isDepartmentsLoading ? (*/}
						{/*							<SelectItem value={'undefined'} disabled>*/}
						{/*								Загрузка отделов...*/}
						{/*							</SelectItem>*/}
						{/*						) : departments && departments.length === 0 ? (*/}
						{/*							<SelectItem value={'undefined'} disabled>*/}
						{/*								Нет доступных отделов*/}
						{/*							</SelectItem>*/}
						{/*						) : (*/}
						{/*							<>*/}
						{/*								<SelectItem value={'undefined'}>*/}
						{/*									Не выбрано*/}
						{/*								</SelectItem>*/}

						{/*								{departments &&*/}
						{/*									departments.map((department) => (*/}
						{/*										<SelectItem*/}
						{/*											value={department.id.toString()}*/}
						{/*											key={department.id}*/}
						{/*										>*/}
						{/*											{department.departmentName}*/}
						{/*										</SelectItem>*/}
						{/*									))}*/}
						{/*							</>*/}
						{/*						)}*/}
						{/*					</SelectContent>*/}
						{/*				</Select>*/}
						{/*			</FormControl>*/}

						{/*			<FormMessage />*/}
						{/*		</FormItem>*/}
						{/*	)}*/}
						{/*/>*/}

						<FormField
							control={form.control}
							name={'performerId'}
							render={() => (
								<FormItem>
									<FormLabel>Исполнитель</FormLabel>

									<FormControl>
										<Select
											onValueChange={(v) => {
												const current = form.getValues('performerId') || [];

												let updated = current.filter(
													(id) => id !== 'undefined',
												);

												if (v === 'undefined') {
													form.setValue('performerId', ['undefined']);
													return;
												}

												if (!updated.includes(v)) {
													updated = [...updated, v];
												}

												form.setValue('performerId', updated);
											}}
											disabled={
												isLoading || form.watch('departmentId') === 'undefined'
											}
										>
											<SelectTrigger size={'lg'} className={'w-full'}>
												<span>
													Добавить исполнителя (
													{
														form
															.watch('performerId')
															?.filter((item) => item !== 'undefined')?.length
													}
													)
												</span>
											</SelectTrigger>

											<SelectContent>
												{isUsersLoading ? (
													<SelectItem value={'undefined'} disabled>
														Загрузка исполнителей...
													</SelectItem>
												) : users && users.length === 0 ? (
													<SelectItem value={'undefined'} disabled>
														Нет доступных исполнителей
													</SelectItem>
												) : (
													users && (
														<>
															{notSelectedUsers?.map((user) => (
																<SelectItem
																	value={user.id.toString()}
																	key={user.id}
																>
																	{user.name}
																</SelectItem>
															))}
														</>
													)
												)}
											</SelectContent>
										</Select>
									</FormControl>

									<div className={'flex flex-wrap items-center gap-2'}>
										{selectedUsers?.map((user) => (
											<button
												type={'button'}
												className={'group relative rounded-full'}
												onClick={(e) => {
													e.preventDefault();

													const current = form.getValues('performerId');

													if (current) {
														const updated = current.filter(
															(id) => id !== user.id?.toString(),
														);
														form.setValue('performerId', updated);
													}
												}}
											>
												<div
													className={cn(
														'group-hover:bg-accent hover:border-destructive absolute z-10 size-full rounded-full border-2 transition-all duration-200 ease-in-out',
													)}
												>
													<IconDelete
														className={cn(
															'pointer-events-none absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-all duration-200 ease-in-out',
															'group-hover:text-destructive pointer-events-auto size-5.5 group-hover:opacity-100',
														)}
													/>
												</div>

												<Avatar fallback={user.name} key={user.id} />
											</button>
										))}
									</div>

									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name={'priorityId'}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Приоритет</FormLabel>

									<FormControl>
										<Select
											value={field.value}
											onValueChange={field.onChange}
											disabled={isLoading}
										>
											<SelectTrigger size={'lg'} className={'w-full'}>
												<SelectValue
													placeholder={'Выберите приоритет задачи'}
												/>
											</SelectTrigger>

											<SelectContent>
												{[1, 2, 3].map((priority) => (
													<SelectItem value={`${priority}`} key={priority}>
														{priority === 1
															? 'Низкий'
															: priority === 2
																? 'Средний'
																: 'Высокий'}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				<div className={'flex items-center justify-end gap-x-4'}>
					<DialogClose asChild disabled={isLoading}>
						<Button disabled={isLoading} variant={'outline'} size={'lg'}>
							<IconCancel />
							Отменить
						</Button>
					</DialogClose>

					<Button size={'lg'} loading={isLoading}>
						<IconNoteEdit />
						Сохранить
					</Button>
				</div>
			</form>
		</Form>
	);
}
