import { isBefore, startOfToday } from 'date-fns';
import { PropsWithChildren, useState } from 'react';
import { DateRange } from 'react-day-picker';

import { useEditTaskDates } from '@/features/task/hooks';

import { IconCancel, IconCheck } from '@/shared/components/shared';
import {
	Button,
	Calendar,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/shared/components/ui';

interface Props {
	taskId: number;
}

export function EditTaskDatesModal({
	taskId,
	children,
}: PropsWithChildren<Props>) {
	const { updateTaskDates, isUpdateTaskDatesLoading } = useEditTaskDates();

	const [date, setDate] = useState<DateRange | undefined>({
		from: new Date(),
		to: new Date(),
	});

	const handleUpdateTaskDates = () => {
		if (date?.from && date?.to) {
			updateTaskDates({
				taskId,
				dates: {
					from: date.from,
					to: date.to,
				},
			});
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>

			<DialogContent className={'sm:max-w-min'}>
				<DialogHeader>
					<DialogTitle>Изменить сроки выполнения задачи</DialogTitle>

					<DialogDescription>
						Здесь вы можете отправить соглашение на изменение сроков выполнения
						задачи.
					</DialogDescription>
				</DialogHeader>

				<Calendar
					initialFocus
					mode='range'
					defaultMonth={date?.from}
					selected={date}
					onSelect={setDate}
					disabled={(date) =>
						isBefore(date, startOfToday()) || isUpdateTaskDatesLoading
					}
					numberOfMonths={2}
				/>

				<DialogFooter>
					<DialogClose asChild>
						<Button
							size={'lg'}
							variant={'outline'}
							disabled={isUpdateTaskDatesLoading}
						>
							<IconCancel />
							Отменить
						</Button>
					</DialogClose>

					<Button
						size={'lg'}
						onClick={handleUpdateTaskDates}
						loading={isUpdateTaskDatesLoading}
					>
						<IconCheck />
						Согласовать
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
