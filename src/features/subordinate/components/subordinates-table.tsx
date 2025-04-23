import { SubordinateItemMenu } from '@/features/subordinate/components/subordinate-item-menu';
import { ISubordinate } from '@/features/subordinate/types';

import { IconMoreVertical } from '@/shared/components/shared';
import {
	Avatar,
	Button,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/shared/components/ui';

interface Props {
	subordinates: ISubordinate[];
}

export function SubordinatesTable({ subordinates }: Props) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className={'w-[80px]'}>Аватар</TableHead>
					<TableHead>ФИО</TableHead>
					<TableHead>Почта</TableHead>
					<TableHead>Департамент</TableHead>
					<TableHead className='w-[80px] text-right'>Действия</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{subordinates.map((subordinate) => (
					<TableRow key={subordinate.id}>
						<TableCell>
							<Avatar
								src={subordinate.avatar}
								fallback={subordinate.name}
								className={'size-10'}
							/>
						</TableCell>
						<TableCell className='font-medium'>{subordinate.name}</TableCell>
						<TableCell>{subordinate.email}</TableCell>
						<TableCell className={'text-right'}>
							{subordinate.departmentName}
						</TableCell>
						<TableCell>
							<div className={'flex items-center justify-end'}>
								<SubordinateItemMenu subordinateId={subordinate.id}>
									<Button size={'icon'} variant={'ghost'}>
										<IconMoreVertical className={'size-5'} />
									</Button>
								</SubordinateItemMenu>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
