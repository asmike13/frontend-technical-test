/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */

import { setLangage } from '../../i18next';
import Conversations, { IConversationsProps } from './Conversations';
import { renderWithRouter } from '../../helpers';
import { fireEvent } from '@testing-library/react';
import { screen } from '@testing-library/react';

setLangage('fr');

const props: IConversationsProps = {
	conversations: [{
		id: 3,
		recipientId: 1,
		recipientNickname: "Thibaut",
		senderId: 4,
		senderNickname: "Elodie",
		lastMessageTimestamp: 1625648667
	}, {
		id: 3,
		recipientId: 4,
		recipientNickname: "Elodie",
		senderId: 3,
		senderNickname: "Thibaut",
		lastMessageTimestamp: 1625648663,
	}],
	userNickname: 'Elodie',
	onMessagesSelection: () => { },
	onClickNewConversation: () => { },
	createNewConversation: () => { },
	deleteConversation: () => { },
	userId: 4,
	users: [{
		id: 1,
		nickname: "Thibaut",
		token: "xxxx"
	}]
};

test('should render conversations', () => {
	const { container } = renderWithRouter(<Conversations {...props} />);

	expect(container.querySelector('.header span')?.innerHTML).toBe('Conversations de Elodie');
	expect(container.querySelector('.conversation-name')?.innerHTML).toBe('De Elodie à Thibaut');
});

test('should display trash only when current user is sender', () => {
	const { container } = renderWithRouter(<Conversations {...props} />);

	expect(/DeleteIcon/.test(container.querySelectorAll('.conversation-container')[0]?.innerHTML)).toBeTruthy();
	expect(!/DeleteIcon/.test(container.querySelectorAll('.conversation-container')[1]?.innerHTML)).toBeTruthy();
});

test('should display list of user on new conversation click', () => {
	const { container } = renderWithRouter(<Conversations {...props} />);

	fireEvent.click(screen.getByTestId('add-conversation'))
	expect(screen.getByTestId('users-list')).toHaveTextContent('Ajouter une conversation avec');
	expect(/Thibaut/.test(container.querySelector('.users-container')?.innerHTML || '')).toBeTruthy();

	fireEvent.click(screen.getByTestId('add-conversation'))
	expect(screen.queryByTestId('users-list')).not.toBeInTheDocument();
	expect(!/Thibaut/.test(container.querySelector('.users-container')?.innerHTML || '')).toBeTruthy();
});
