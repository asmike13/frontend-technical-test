import React from 'react';
import { Conversation, getConversationByUserId } from '../../api/conversationsApi';
import Conversations from './Conversations';

const ConversationsContainer = () => {
	const [conversations, setConversations] = React.useState<Conversation[]>([]);

	React.useEffect(() => {
		console.log('here')
		getConversationByUserId({ userId: 1 })
			.then((response) => {
				setConversations(response.data as Conversation[]);
				console.log(response.data)
			})
	}, []);

	const props = {
		conversations,
	};

	return <Conversations {...props} />;
}

export default ConversationsContainer;