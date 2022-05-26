/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { setLangage } from '../../../i18next';
import Avatar from './Avatar';

setLangage('fr');

test('should render Avatar', () => {
	const { container } = render(<Avatar str="thibaut" />);
	expect(/MuiAvatar-root/.test(container.innerHTML)).toBeTruthy();
	expect(container.querySelector('.MuiAvatar-root')?.innerHTML).toBe('TH');
});
