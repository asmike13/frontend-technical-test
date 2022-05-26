/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */

import React from 'react';
import { render, screen } from '@testing-library/react';
import Bubble, { BubbleProps } from './Bubble';

const props: BubbleProps = {
	body: 'Hello',
	authorNickname: 'Jean',
	timestamp: '1625648667',
	samePrevious: false,
	from: 'sender',
	editMode: false,
	onDelete: () => { },
};

test('should render Bubble from sender', () => {
	const { container } = render(<Bubble {...props} />);

	expect(/Hello/.test(container.querySelector('.bubble-container .bubble')?.innerHTML || '')).toBeTruthy();
	expect(!/Jean/.test(container.querySelector('.bubble-container .author')?.innerHTML || '')).toBeTruthy();
});

test('should render Bubble from recipient', () => {
	const { container } = render(<Bubble {...props} from={'recipient'} />);

	expect(/Hello/.test(container.querySelector('.bubble-container .bubble')?.innerHTML || '')).toBeTruthy();
	expect(/Jean/.test(container.querySelector('.bubble-container .author')?.innerHTML || '')).toBeTruthy();
});

test('should render Bubble from recipient with samePrevious', () => {
	const { container } = render(<Bubble {...props} from={'recipient'} samePrevious />);

	expect(!/Jean/.test(container.querySelector('.bubble-container .author')?.innerHTML || '')).toBeTruthy();
});

test('should render Bubble with editMode active from sender', () => {
	const { container } = render(<Bubble {...props} editMode />);

	expect(/DeleteIcon/.test(container.querySelector('.bubble-container')?.innerHTML || '')).toBeTruthy();
});

test('should render Bubble with editMode active from recipient', () => {
	const { container } = render(<Bubble {...props} editMode from={'recipient'} />);

	expect(!/DeleteIcon/.test(container.querySelector('.bubble-container')?.innerHTML || '')).toBeTruthy();
});
