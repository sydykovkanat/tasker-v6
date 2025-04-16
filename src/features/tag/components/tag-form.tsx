import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useAuthStore } from '@/features/auth/store';
import { useGetDepartments } from '@/features/department/hooks';
import { TagSchema, TagSchemaType } from '@/features/tag/schemas';

import { IconAdd } from '@/shared/components/shared';
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
	onSubmit: (body: TagSchemaType) => void;
	isLoading?: boolean;
	defaultValues?: TagSchemaType;
}

export function TagForm({ onSubmit, isLoading, defaultValues }: Props) {
	const user = useAuthStore((state) => state.user);

	const form = useForm<TagSchemaType>({
		resolver: zodResolver(TagSchema),
		defaultValues: {
			name: defaultValues?.name ?? '',
			description: defaultValues?.description ?? '',
			departmentId: defaultValues?.departmentId ?? '',
		},
	});

	const handleSubmit = (data: TagSchemaType) => {
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
					<IconAdd />
					Сохранить
				</Button>
			</form>
		</Form>
	);
}
