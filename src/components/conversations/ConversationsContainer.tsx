import React from 'react';
import { useParams } from 'react-router-dom';
import { Conversation, getConversationByUserId } from '../../api/conversationsApi';
import { getUserById, User } from '../../api/usersApi';
import Conversations from './Conversations';

interface ConversationsContainerProps {
	setSenderNickname: React.Dispatch<React.SetStateAction<string>>;
	setRecipientNickname: React.Dispatch<React.SetStateAction<string>>;
}

const ConversationsContainer = ({
	setSenderNickname,
	setRecipientNickname,
}: ConversationsContainerProps) => {
	const { userId } = useParams();

	const [conversations, setConversations] = React.useState<Conversation[]>([]);
	const [user, setUser] = React.useState<User | undefined>();

	React.useEffect(() => {
		getConversationByUserId({ userId: Number(userId) })
			.then((response) => {
				const data = response.data as Conversation[];
				setConversations(data);
			})

		getUserById({ userId: Number(userId) })
			.then((response) => {
				const data = response.data as User;
				setUser(data);
			})
	}, []);

	const onMessagesSelection = (conversation: Conversation) => {
		setSenderNickname(conversation.senderNickname);
		setRecipientNickname(conversation.recipientNickname);
	}

	const props = {
		conversations,
		userNickname: user?.nickname || '',
		userId,
		onMessagesSelection,
	};

	return <Conversations {...props} />;
}

export default ConversationsContainer;