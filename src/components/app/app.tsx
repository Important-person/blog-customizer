import { Article } from '../article';
import { ArticleParamsForm } from '../article-params-form';
import { CSSProperties, useState } from 'react';
import { defaultArticleState, OptionType } from 'src/constants/articleProps';

import styles from './app.module.scss';

export type initialState = {
	fontFamily: OptionType;
	fontSize: OptionType;
	fontColor: OptionType;
	contentWidth: OptionType;
	backgroundColor: OptionType;
};

export const App = () => {
	const initialArticleState: initialState = {
		fontFamily: defaultArticleState.fontFamilyOption,
		fontSize: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		contentWidth: defaultArticleState.contentWidth,
		backgroundColor: defaultArticleState.backgroundColor,
	};

	const [appliedStyles, setAppliedStyles] = useState(initialArticleState);

	return (
		<div
			className={styles.main}
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
				state={initialArticleState}
				setAppliedState={setAppliedStyles}
			/>
			<Article />
		</div>
	);
};
