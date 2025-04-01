import { ISubordinate } from '@/features/subordinate/types';

import {
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
					<TableHead>ФИО</TableHead>
					<TableHead>Почта</TableHead>
					<TableHead className='text-right'>Департамент</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{subordinates.map((subordinate) => (
					<TableRow key={subordinate.id}>
						<TableCell className='font-medium'>{subordinate.name}</TableCell>
						<TableCell>{subordinate.email}</TableCell>
						<TableCell className={'text-right'}>
							{subordinate.departmentName}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
