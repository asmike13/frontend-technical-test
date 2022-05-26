import React from 'react';
import { useParams } from 'react-router-dom';
import { Conversation, getConversationByUserId } from '../../api/conversationsApi';
import Conversations from './Conversations';

const ConversationsContainer = () => {
	const { senderId } = useParams();

	const [conversations, setConversations] = React.useState<Conversation[]>([]);

	React.useEffect(() => {
		getConversationByUserId({ userId: Number(senderId) })
			.then((response) => {
				const data = response.data as Conversation[];
				setConversations(data);
			})
	}, [senderId]);

	const props = {
		conversations,
	};

	return <Conversations {...props} />;
}

export default ConversationsContainer;