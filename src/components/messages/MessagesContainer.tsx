import moment from 'moment';
import React from 'react';
import { useParams } from 'react-router-dom';
import { deleteMessageById, getMessagesByConversationId, Message, postMessagesByConversationId } from '../../api/messagesApi';
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

	const getMessages = () => {
		getMessagesByConversationId({ conversationId: Number(conversationId) })
			.then((response) => {
				const data = response.data as Message[];
				setMessages(data);
			})
	}

	React.useEffect(() => {
		getAllUsers()
			.then((response) => {
				const data = response.data as User[];
				setUsers(data);
			})

		getMessages();
	}, []);

	const onSendMessage = (body: string) => {
		postMessagesByConversationId({
			message: {
				authorId: Number(userId),
				body,
				timestamp: moment().unix().toString(),
				conversationId: Number(conversationId),
			},
			conversationId: Number(conversationId),
		}).then((response) => {
			if (response.status === 201) {
				getMessages();
			}
		});
	};

	const onDeleteMessage = (messageId: number) => {
		deleteMessageById({ messageId });
	}

	const props = {
		messages: messages.map((m, i) => ({
			...m,
			authorNickname: users.find((u) => u.id === m.authorId)?.nickname,
			// check if the author is sender or recipient
			from: m.authorId === Number(userId) ? 'sender' : 'recipient' as 'sender' | 'recipient',
			// If two consecutive message from same author display name once
			samePrevious: m.authorId === messages[i - 1]?.authorId,
		})),
		senderNickname,
		recipientNickname,
		onSendMessage,
		onDeleteMessage,
	};

	return <Messages {...props} />;
}

export default MessagesContainer;