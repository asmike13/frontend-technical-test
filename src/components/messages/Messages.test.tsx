/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */

import { render } from '@testing-library/react';
import { setLangage } from '../../i18next';
import Messages, { IMessagesProps } from './Messages';

setLangage('fr');

const props: IMessagesProps = {
	messages: [{
		authorId: 1,
		body: "Hello",
		conversationId: 1,
		id: 5,
		timestamp: "1653563299",
	}],
	senderNickname: 'Thibaut',
	recipientNickname: 'Jeremie',
	onSendMessage: (message: string) => { },
	onDeleteMessage: (messageId: number) => { },
};

test('should render messages', () => {
	const { container } = render(<Messages {...props} />);

	expect(container.querySelector('.header span')?.innerHTML).toBe('De Thibaut à Jeremie');
	expect(/Hello/.test(container.querySelectorAll('.bubble')[0]?.innerHTML)).toBeTruthy();
});
