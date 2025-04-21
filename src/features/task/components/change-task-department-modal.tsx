import { FormEvent, PropsWithChildren, useState } from 'react';
import { toast } from 'sonner';

import { useGetDepartments } from '@/features/department/hooks';
import { useEditTaskDepartment } from '@/features/task/hooks';

import { IconCancel, IconCheck } from '@/shared/components/shared';
import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Textarea,
} from '@/shared/components/ui';

interface Props {
	taskId: number;
}

export function ChangeTaskDepartmentModal({
	taskId,
	children,
}: PropsWithChildren<Props>) {
	const [formData, setFormData] = useState({
		departmentId: '',
		reason: '',
	});

	const [isOpen, setIsOpen] = useState(false);
	const { editDepartment, isEditDepartmentTaskLoading } =
		useEditTaskDepartment();
	const { departments, isDepartmentsLoading } = useGetDepartments();

	const handleEdit = (e: FormEvent) => {
		e.preventDefault();

		if (!formData.departmentId) {
			toast.warning('Выберите департамент', {
				description:
					'Пожалуйста, выберите департамент, в который хотите перенести задачу',
			});
			return;
		}

		if (!formData.reason) {
			toast.warning('Укажите причину изменения', {
				description: 'Пожалуйста, укажите причину изменения департамента.',
			});
			return;
		}

		if (formData.reason.length < 20 || formData.reason.split(' ').length < 2) {
			toast.warning('Причина изменения слишком короткая', {
				description:
					'Причина изменения должна быть не менее 20 символов и 2 слов.',
			});
			return;
		}

		editDepartment({
			taskId,
			departmentId: Number(formData.departmentId),
			reason: formData.reason,
		});

		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Изменить департамент задачи</DialogTitle>

					<DialogDescription>
						Выберите департамент, в который хотите перенести задачу и укажите
						причину
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleEdit} className={'space-y-4'}>
					<Select
						value={formData.departmentId}
						onValueChange={(v) => {
							setFormData((prev) => ({
								...prev,
								departmentId: v,
							}));
						}}
					>
						<SelectTrigger size={'lg'}>
							<SelectValue placeholder='Выберите департамент' />
						</SelectTrigger>

						<SelectContent>
							{isDepartmentsLoading ? (
								<SelectItem value={'loading'} disabled>
									Загрузка...
								</SelectItem>
							) : (
								departments &&
								(departments.length === 0 ? (
									<SelectItem value={'empty'} disabled>
										Нет департаментов
									</SelectItem>
								) : (
									departments.map((department) => (
										<SelectItem
											key={department.id}
											value={String(department.id)}
										>
											{department.departmentName}
										</SelectItem>
									))
								))
							)}
						</SelectContent>
					</Select>

					<Textarea
						placeholder={'Причина изменения'}
						className={'h-24'}
						value={formData.reason}
						onChange={(e) => {
							setFormData((prev) => ({
								...prev,
								reason: e.target.value,
							}));
						}}
					/>

					<DialogFooter>
						<DialogClose
							asChild
							type={'button'}
							disabled={isEditDepartmentTaskLoading}
						>
							<Button
								variant={'outline'}
								size={'lg'}
								type={'button'}
								disabled={isEditDepartmentTaskLoading}
							>
								<IconCancel /> Отменить
							</Button>
						</DialogClose>

						<Button
							size={'lg'}
							type={'submit'}
							loading={isEditDepartmentTaskLoading}
						>
							<IconCheck />
							Сохранить
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
