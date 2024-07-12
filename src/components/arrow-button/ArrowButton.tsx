import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';
import React from 'react';

export type OnClick = () => void;

interface ArrowButtonProps {
	onClick: OnClick;
	open: boolean;
}

export const ArrowButton = React.forwardRef<HTMLDivElement, ArrowButtonProps>(
	({ onClick, open }, ref) => {
		const classNameOpenContainer = clsx({
			[styles.container]: true,
			[styles.container_open]: open,
		});

		const classNameOpenArrow = clsx({
			[styles.arrow]: true,
			[styles.arrow_open]: open,
		});

		return (
			<div
				ref={ref}
				role='button'
				aria-label='Открыть/Закрыть форму параметров статьи'
				tabIndex={0}
				onClick={onClick}
				className={classNameOpenContainer}>
				<img
					src={arrow}
					alt='иконка стрелочки'
					className={classNameOpenArrow}
				/>
			</div>
		);
	}
);

ArrowButton.displayName = 'ArrowButton';
