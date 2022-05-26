import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

Object.defineProperty(window, 'location', { value: { search: '' } });

test('should render App with correct route /', () => {
	window.location.pathname = '/';
	const { container } = render(<App />);

	expect(/Voir les discutions de quel user/.test(container.innerHTML)).toBeTruthy();
});

test('should render App with NotFound for route /conversations', () => {
	window.location.pathname = '/conversations';
	const { container } = render(<App />);

	expect(/Selectionnez un utilisateur sur la page Home/.test(container.innerHTML)).toBeTruthy();
});

test('should render App with correct route /conversations/:userId', () => {
	window.location.pathname = '/conversations/1';
	const { container } = render(<App />);

	expect(/conversation-container/.test(container.innerHTML)).toBeTruthy();
});

test('should render App with NotFound route /messages', () => {
	window.location.pathname = '/messages';
	const { container } = render(<App />);

	expect(/Selectionnez une conversation sur la page conversation/.test(container.innerHTML)).toBeTruthy();
});

test('should render App with correct route /messages/:userId/:conversationId', () => {
	window.location.pathname = '/messages/1/1';
	const { container } = render(<App />);

	expect(/messages-container/.test(container.innerHTML)).toBeTruthy();
});

test('should render NotFound when other routes', () => {
	window.location.pathname = '/other';
	const { container } = render(<App />);

	expect(/Page introuvable/.test(container.innerHTML)).toBeTruthy();
});
