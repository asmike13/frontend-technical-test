import React from 'react';
import { useParams } from 'react-router-dom';
import { Conversation, getConversationByUserId } from '../../api/conversationsApi';
import Conversations from './Conversations';

const ConversationsContainer = () => {
	const { senderId } = useParams();

	const [conversations, setConversations] = React.useState<Conversation[]>([]);

	React.useEffect(() => {
		getConversationByUserId({ userId: 1 })
			.then((response) => {
				const data = response.data as Conversation[];
				const filteredData = senderId
					? data.filter((d) => d.senderId === Number(senderId))
					: data;
				setConversations(filteredData as Conversation[]);
			})
	}, [senderId]);

	const props = {
		conversations,
	};

	return <Conversations {...props} />;
}

export default ConversationsContainer;