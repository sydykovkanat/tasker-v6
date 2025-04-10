interface Props {
	status: string;
	count: number;
}

export function TasksColumnTitle({ status, count }: Props) {
	return (
		<div
			className={
				'bg-secondary mb-2 flex gap-x-2 rounded-lg border border-dashed px-4 py-1'
			}
		>
			<span>{status}</span>

			<span className={'text-muted-foreground'}>({count})</span>
		</div>
	);
}
