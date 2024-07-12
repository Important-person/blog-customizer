import type { Meta, StoryObj } from '@storybook/react';

import { Select } from './Select';
import { useState } from 'react';

const meta: Meta<typeof Select> = {
	component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

const SelectWithState = () => {
	const options = [
		{ title: '1 опция', value: '1 опция', className: '' },
		{ title: '2 опция', value: '2 опция', className: '' },
		{ title: '3 опция', value: '3 опция', className: '' },
		{ title: '4 опция', value: '4 опция', className: '' },
	];

	const initialState = {
		option: options[0],
	};

	const [selected, setSelected] = useState(initialState.option);

	const handleChange = (access: string, value: any) => {
		setSelected((prevState) => ({
			...prevState,
			[access]: value,
		}));
	};

	return (
		<>
			<Select
				access={'option'}
				selected={selected}
				onChange={handleChange}
				options={options}
				title='Название радиогруппы'
			/>
		</>
	);
};

export const SelectStory: Story = {
	render: () => <SelectWithState />,
};
