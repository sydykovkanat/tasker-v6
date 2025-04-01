import { Input } from '@/shared/components/ui';

interface Props {
	value: string;
	onChange: (value: string) => void;
	className?: string;
}

export function SubordinatesSearch({ value, onChange, className }: Props) {
	return (
		<Input
			value={value}
			onChange={(e) => onChange(e.target.value)}
			placeholder={'Поиск...'}
			className={className}
		/>
	);
}
