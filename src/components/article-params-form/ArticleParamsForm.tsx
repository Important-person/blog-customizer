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
import { initialState } from '../app/app';
import { Separator } from '../separator';
import { Text } from '../text';

type props = {
	state: initialState;
	setAppliedState: (articleState: initialState) => void;
};

export const ArticleParamsForm = (props: props) => {
	const [articleState, setArticleState] = useState(props.state);
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

	const handleResetButton = (evt: React.MouseEvent<HTMLButtonElement>) => {
		evt.preventDefault();
		setArticleState(props.state);
		props.setAppliedState(props.state);
	};

	const handleSubmit = (evt: React.MouseEvent<HTMLFormElement>) => {
		evt.preventDefault();
		props.setAppliedState(articleState);
	};

	const handleChange = (access: string, value: OptionType) => {
		setArticleState((prevState) => ({
			...prevState,
			[access]: value,
		}));
	};

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
		if (!isVisibele) return;

		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [isVisibele, isInsideClick]);

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
					<form className={styles.form} onSubmit={handleSubmit}>
						<Text uppercase={true} as={'h2'} size={31} weight={800}>
							Задайте параметры
						</Text>
						<Select
							access='fontFamily'
							onChange={handleChange}
							options={fontFamilyOptions}
							selected={articleState.fontFamily}
							title={'Шрифт'}
						/>
						<RadioGroup
							access='fontSize'
							onChange={handleChange}
							name={'fontSize'}
							selected={articleState.fontSize}
							options={fontSizeOptions}
							title={'Размер шрифта'}
						/>
						<Select
							access='fontColor'
							onChange={handleChange}
							options={fontColors}
							selected={articleState.fontColor}
							title={'Цвет шрифта'}
						/>
						<Separator />
						<Select
							access='backgroundColor'
							onChange={handleChange}
							options={backgroundColors}
							selected={articleState.backgroundColor}
							title={'Цвет фона'}
						/>
						<Select
							access='contentWidth'
							onChange={handleChange}
							options={contentWidthArr}
							selected={articleState.contentWidth}
							title={'Ширина контента'}
						/>
						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								type='reset'
								onClick={handleResetButton}
							/>
							<Button title='Применить' type='submit' />
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
