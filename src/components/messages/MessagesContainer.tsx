import React from 'react';
import { useParams } from 'react-router-dom';
import { getMessagesByConversationId, Message } from '../../api/messagesApi';
import { getAllUsers, User } from '../../api/usersApi';
import Messages from './Messages';

interface MessagesContainerProps {
	senderNickname: string
	recipientNickname: string
}

const MessagesContainer = ({
	senderNickname,
	recipientNickname,
}: MessagesContainerProps) => {
	const { userId, conversationId } = useParams();

	const [messages, setMessages] = React.useState<Message[]>([]);
	const [users, setUsers] = React.useState<User[]>([]);

	React.useEffect(() => {
		getAllUsers()
			.then((response) => {
				const data = response.data as User[];
				setUsers(data);
			})

		getMessagesByConversationId({ conversationId: Number(conversationId) })
			.then((response) => {
				const data = response.data as Message[];
				setMessages(data);
			})
	}, [userId, conversationId]);

	const props = {
		messages: messages.map((m, i) => ({
			...m,
			authorNickname: users.find((u) => u.id === m.authorId)?.nickname,
			from: m.authorId === Number(userId) ? 'sender' : 'recipient' as 'sender' | 'recipient',
			samePrevious: m.authorId === messages[i - 1]?.authorId,
		})),
		senderNickname,
		recipientNickname,
	};

	return <Messages {...props} />;
}

export default MessagesContainer;