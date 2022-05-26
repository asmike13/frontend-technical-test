import React from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { Conversation, deleteConversationById, getConversationByUserId, postConversationByUserId } from '../../api/conversationsApi';
import { getAllUsers, getUserById, User } from '../../api/usersApi';
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
	const [users, setUsers] = React.useState<User[]>([]);

	const onClickNewConversation = () => {
		users.length === 0 && getAllUsers()
			.then((response) => {
				const data = response.data as User[];
				setUsers(data);
			})
	};

	const createNewConversation = (u: User) => {
		postConversationByUserId({
			conversation: {
				senderId: Number(userId),
				senderNickname: users.find((findUser) => findUser.id === Number(userId))?.nickname || '',
				recipientId: u.id,
				recipientNickname: u.nickname,
				lastMessageTimestamp: moment().unix(),
			},
			userId: Number(userId),
		})
	};

	const deleteConversation = (conversationId: number) => {
		deleteConversationById({
			conversationId,
		})
	};

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
		users,
		onMessagesSelection,
		onClickNewConversation,
		createNewConversation,
		deleteConversation,
	};

	return <Conversations {...props} />;
}

export default ConversationsContainer;