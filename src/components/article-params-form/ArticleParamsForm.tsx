import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useEffect, useRef, useState } from 'react';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import {
	fontFamilyOptions,
	fontSizeOptions,
	backgroundColors,
	fontColors,
	contentWidthArr,
	OptionType,
} from 'src/constants/articleProps';
import { initialState } from 'src/index';
import { Separator } from '../separator';
import { Text } from '../text';

type props = {
	state: initialState;
	reset: (evt: React.MouseEvent<HTMLButtonElement>) => void;
	submit: (evt: React.MouseEvent<HTMLButtonElement>) => void;
	change: (access: string, value: OptionType) => void;
};

export const ArticleParamsForm = (props: props) => {
	const [isVisibele, setIsVisible] = useState(false);
	const [isInsideClick, setIsInsideClick] = useState(false);

	const sideBarRef = useRef<HTMLDivElement>(null);
	const arrowButtonRef = useRef<HTMLDivElement>(null);

	const handleArrowButton = () => {
		setIsVisible(!isVisibele);
	};

	const classNameOpen = clsx({
		[styles.container]: true,
		[styles.container_open]: isVisibele,
	});

	const handleClickOutside = (evt: MouseEvent) => {
		if (
			!isInsideClick &&
			sideBarRef.current &&
			!sideBarRef.current.contains(evt.target as Node) &&
			arrowButtonRef.current &&
			!arrowButtonRef.current.contains(evt.target as Node)
		) {
			setIsVisible(false);
		}

		setIsInsideClick(false);
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [isInsideClick]);

	const handleInsideClick = () => {
		setIsInsideClick(true);
	};

	return (
		<>
			<ArrowButton
				ref={arrowButtonRef}
				onClick={handleArrowButton}
				open={isVisibele}
			/>
			{isVisibele && (
				<aside
					ref={sideBarRef}
					className={classNameOpen}
					onClick={handleInsideClick}>
					<form className={styles.form}>
						<Text uppercase={true} as={'h2'} size={31} weight={800}>
							Задайте параметры
						</Text>
						<Select
							access='fontFamily'
							onChange={props.change}
							options={fontFamilyOptions}
							selected={props.state.fontFamily}
							title={'Шрифт'}
						/>
						<RadioGroup
							access='fontSize'
							onChange={props.change}
							name={'fontSize'}
							selected={props.state.fontSize}
							options={fontSizeOptions}
							title={'Размер шрифта'}
						/>
						<Select
							access='fontColor'
							onChange={props.change}
							options={fontColors}
							selected={props.state.fontColor}
							title={'Цвет шрифта'}
						/>
						<Separator />
						<Select
							access='backgroundColor'
							onChange={props.change}
							options={backgroundColors}
							selected={props.state.backgroundColor}
							title={'Цвет фона'}
						/>
						<Select
							access='contentWidth'
							onChange={props.change}
							options={contentWidthArr}
							selected={props.state.contentWidth}
							title={'Ширина контента'}
						/>
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' type='reset' onClick={props.reset} />
							<Button title='Применить' type='submit' onClick={props.submit} />
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
