import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useAuthStore } from '@/features/auth/store';
import { useGetDepartments } from '@/features/department/hooks';
import { ProjectSchema, ProjectSchemaType } from '@/features/project/schemas';

import { IconFolderAdd } from '@/shared/components/shared';
import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
	Input,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Textarea,
} from '@/shared/components/ui';

interface Props {
	onSubmit: (body: ProjectSchemaType) => void;
	isLoading?: boolean;
	defaultValues?: ProjectSchemaType;
}

export function ProjectForm({ onSubmit, isLoading, defaultValues }: Props) {
	const user = useAuthStore((state) => state.user);

	const form = useForm<ProjectSchemaType>({
		resolver: zodResolver(ProjectSchema),
		defaultValues: {
			name: defaultValues?.name ?? '',
			description: defaultValues?.description ?? '',
			departmentId: defaultValues?.departmentId ?? '',
		},
	});

	const handleSubmit = (data: ProjectSchemaType) => {
		if (user?.roles.includes('ADMIN')) {
			if (!data.departmentId) {
				form.setError('departmentId', {
					type: 'required',
					message: 'Выберите отдел',
				});
				return;
			}

			onSubmit({
				description: data.description,
				name: data.name,
				departmentId: data.departmentId,
			});
		} else {
			onSubmit({
				description: data.description,
				name: data.name,
			});
		}
	};

	const { isDepartmentsLoading, departments } = useGetDepartments();

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)} className={'space-y-3'}>
				<FormField
					control={form.control}
					name={'name'}
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder={'Название'}
									disabled={isLoading}
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
							<FormControl>
								<Textarea
									placeholder={'Описание'}
									className={'h-40'}
									disabled={isLoading}
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				{user?.roles.includes('ADMIN') && (
					<FormField
						control={form.control}
						name={'departmentId'}
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Select
										disabled={isLoading || isDepartmentsLoading}
										value={field.value}
										onValueChange={field.onChange}
									>
										<SelectTrigger size={'lg'} className={'w-full'}>
											<SelectValue placeholder={'Выберите отдел'} />
										</SelectTrigger>

										<SelectContent>
											{departments?.map((department) => (
												<SelectItem
													key={department.id}
													value={department.id.toString()}
												>
													{department.departmentName}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</FormControl>

								<FormMessage />
							</FormItem>
						)}
					/>
				)}

				<Button
					loading={isLoading}
					type={'submit'}
					size={'lg'}
					className={'w-full'}
				>
					<IconFolderAdd />
					Создать
				</Button>
			</form>
		</Form>
	);
}
