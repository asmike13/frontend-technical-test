import React from 'react';
import { useParams } from 'react-router-dom';
import { getMessagesByConversationId, Message } from '../../api/messagesApi';
import Messages from './Messages';

interface MessagesContainerProps {
	senderNickname: string
	recipientNickname: string
}

const MessagesContainer = ({
	senderNickname,
	recipientNickname,
}: MessagesContainerProps) => {
	const { conversationId } = useParams();

	const [messages, setMessages] = React.useState<Message[]>([]);

	React.useEffect(() => {
		getMessagesByConversationId({ conversationId: Number(conversationId) })
			.then((response) => {
				const data = response.data as Message[];
				setMessages(data);
			})
	}, [conversationId]);

	const props = {
		messages,
		senderNickname,
		recipientNickname,
	};

	return <Messages {...props} />;
}

export default MessagesContainer;