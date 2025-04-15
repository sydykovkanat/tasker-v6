import React from 'react';

import styles from './shiny-text.module.css';

interface ShinyTextProps {
	text: string;
	disabled?: boolean;
	speed?: number;
	className?: string;
}

export const ShinyText: React.FC<ShinyTextProps> = ({
	text,
	disabled = false,
	speed = 5,
	className = '',
}) => {
	const animationDuration = `${speed}s`;

	return (
		<div
			className={`${styles.shinyText} ${disabled ? `${styles.disabled}` : ''} ${className}`}
			style={{ animationDuration }}
		>
			{text}
		</div>
	);
};
