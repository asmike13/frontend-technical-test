import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';
import { setLangage } from '../../../i18next';

setLangage('fr');

test('should render with default text', () => {
	render(<NotFound />);
	expect(screen.getByTestId('not-found')).toHaveTextContent('Page introuvable');
});

test('should render with props text', () => {
	render(<NotFound text='toto' />);
	expect(screen.getByTestId('not-found')).toHaveTextContent('toto');
});
