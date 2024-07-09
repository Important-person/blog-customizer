import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, OptionType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

export type initialState = {
	fontFamily: OptionType;
	fontSize: OptionType;
	fontColor: OptionType;
	contentWidth: OptionType;
	backgroundColor: OptionType;
};

const App = () => {
	const initialArticleState: initialState = {
		fontFamily: defaultArticleState.fontFamilyOption,
		fontSize: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		contentWidth: defaultArticleState.contentWidth,
		backgroundColor: defaultArticleState.backgroundColor,
	};

	const [articleState, setArticleState] = useState(initialArticleState);
	const [appliedStyles, setAppliedStyles] = useState(initialArticleState);

	const handleResetButton = (evt: React.MouseEvent<HTMLButtonElement>) => {
		evt.preventDefault();
		setArticleState(initialArticleState);
		setAppliedStyles(initialArticleState);
	};

	const handleSubmitButton = (evt: React.MouseEvent<HTMLButtonElement>) => {
		evt.preventDefault();
		setAppliedStyles(articleState);
	};

	const handleChange = (access: string, value: OptionType) => {
		setArticleState((prevState) => ({
			...prevState,
			[access]: value,
		}));
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appliedStyles.fontFamily.value,
					'--font-size': appliedStyles.fontSize.value,
					'--font-color': appliedStyles.fontColor.value,
					'--container-width': appliedStyles.contentWidth.value,
					'--bg-color': appliedStyles.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				state={articleState}
				reset={handleResetButton}
				submit={handleSubmitButton}
				change={handleChange}
			/>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
