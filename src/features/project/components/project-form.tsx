import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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
	Textarea,
} from '@/shared/components/ui';

interface Props {
	onSubmit: (body: ProjectSchemaType) => void;
	isLoading?: boolean;
}

export function ProjectForm({ onSubmit, isLoading }: Props) {
	const form = useForm<ProjectSchemaType>({
		resolver: zodResolver(ProjectSchema),
		defaultValues: {
			name: '',
			description: '',
		},
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className={'space-y-3'}>
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
