import { Link } from 'react-router-dom';

import { useUpdateApprove } from '@/features/approves/hooks';
import { IApprove } from '@/features/approves/types';

import {
	IconArrowRight,
	IconArrowsRight,
	IconCancel,
	IconCheck,
} from '@/shared/components/shared';
import {
	Badge,
	Button,
	buttonVariants,
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
	DialogClose,
} from '@/shared/components/ui';
import { date } from '@/shared/lib';
import { cn } from '@/shared/utils';

interface Props {
	approve: IApprove;
}

export function ApprovesCard({ approve }: Props) {
	const { updateApprove, isUpdateApproveLoading } = useUpdateApprove();

	const handleApprove = async (isApprove: boolean) => {
		updateApprove({
			approveId: approve.id,
			isApprove,
		});
	};

	const approveStatus =
		approve.isApprove === null
			? {
					text: 'На рассмотрении',
					color: 'blue',
				}
			: approve.isApprove
				? {
						text: 'Согласовано',
						color: 'green',
					}
				: {
						text: 'Отклонено',
						color: 'red',
					};

	return (
		<Card className={'gap-4 py-4'}>
			<CardHeader className={'px-4'}>
				<div className={'flex items-center justify-between'}>
					<CardTitle>{approve.task.taskName}</CardTitle>

					<Badge
						variant={'outline'}
						className={cn('text-xs', {
							'border-gray-400 bg-gray-100 text-gray-500':
								approveStatus.color === 'blue',
							'border-green-400 bg-green-100 text-green-500':
								approveStatus.color === 'green',
							'border-red-400 bg-red-100 text-red-500':
								approveStatus.color === 'red',
						})}
					>
						{approveStatus.text}
					</Badge>
				</div>
			</CardHeader>

			<CardContent className={'space-y-2.5 px-4'}>
				<div>
					<h4 className={'text-muted-foreground'}>Дата начала:</h4>

					<div className={'flex items-center gap-x-2'}>
						<span>{date(approve.task.startDate)}</span>

						<IconArrowsRight className={'text-muted-foreground size-4'} />

						<span>{date(approve.startDate)}</span>
					</div>
				</div>

				<div>
					<h4 className={'text-muted-foreground'}>Дата окончания:</h4>

					<div className={'flex items-center gap-x-2'}>
						<span>{date(approve.task.endDate)}</span>

						<IconArrowsRight className={'text-muted-foreground size-4'} />

						<span>{date(approve.endDate)}</span>
					</div>
				</div>
			</CardContent>

			<CardFooter className={'justify-between px-4'}>
				<DialogClose asChild>
					<Link
						to={`/tasks/${approve.task.id}`}
						className={buttonVariants({
							variant: 'outline',
							size: 'sm',
						})}
					>
						Перейти к задаче <IconArrowRight />
					</Link>
				</DialogClose>

				<div className={'flex items-center gap-x-2'}>
					<Button
						size={'sm'}
						onClick={() => handleApprove(true)}
						disabled={isUpdateApproveLoading}
					>
						<IconCheck />
						Согласовать
					</Button>

					<Button
						size={'sm'}
						variant={'destructive'}
						onClick={() => handleApprove(false)}
						disabled={isUpdateApproveLoading}
					>
						<IconCancel className={'text-background'} /> Отклонить
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
}
