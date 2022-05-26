import * as H from './helpers';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';

test('stringToColour should return a hex color', () => {
	const color = H.stringToColour('test');
	expect(color).toEqual('#924436');
});

const C = () => (<div>Toto</div>);

test('renderWithRouter should return a component wrapped in Router', () => {
	expect(H.renderWithRouter(<C />).container.innerHTML).toEqual(render(<Router><C /></Router>).container.innerHTML)
});
