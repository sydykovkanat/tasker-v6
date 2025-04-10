import { useState } from 'react';

import {
	SubordinatesSearch,
	SubordinatesTable,
} from '@/features/subordinate/components';
import { useGetSubordinates } from '@/features/subordinate/hooks';

import {
	ErrorBlock,
	IconArrowLeft,
	IconArrowRight,
	Loading,
	PageTitles,
} from '@/shared/components/shared';
import { Button } from '@/shared/components/ui';

export function Subordinates() {
	const [page, setPage] = useState(0);
	const [searchValue, setSearchValue] = useState('');

	const { subordinates, isSubordinatesLoading, isError } = useGetSubordinates(
		page,
		18,
		searchValue,
	);

	if (isError) {
		return <ErrorBlock />;
	}

	const handleNextPage = () => {
		if (!subordinates.last && page < subordinates.totalPages - 1 && page >= 0) {
			setPage((prev) => prev + 1);
		}
	};

	const handlePreviousPage = () => {
		if (!subordinates.first && page > 0) {
			setPage((prev) => prev - 1);
		}
	};

	const handleSearch = (value: string) => {
		setSearchValue(value);
		setPage(0);
	};

	return (
		<div>
			<PageTitles
				title={'Сотрудники'}
				description={'Список всех сотрудников вашего отдела'}
				className={'px-4 py-2'}
			/>

			<section className={'p-4'}>
				<SubordinatesSearch
					value={searchValue}
					onChange={handleSearch}
					className={'mb-2'}
				/>

				{isSubordinatesLoading ? (
					<Loading />
				) : (
					<SubordinatesTable subordinates={subordinates.content} />
				)}

				<div className={'mt-4 flex items-center justify-between'}>
					<p className={'text-muted-foreground'}>
						{page + 1} из {subordinates.totalPages}
					</p>

					<div className={'flex justify-between gap-x-4'}>
						<Button
							disabled={isSubordinatesLoading || subordinates.first}
							variant={'outline'}
							onClick={handlePreviousPage}
						>
							<IconArrowLeft />
							Предыдущая
						</Button>

						<Button
							disabled={isSubordinatesLoading || subordinates.last}
							variant={'outline'}
							onClick={handleNextPage}
						>
							Следующая
							<IconArrowRight />
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
