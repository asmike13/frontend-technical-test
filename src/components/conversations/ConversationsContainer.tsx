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
	const { userId: uid } = useParams();
	const userId = Number(uid);

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
				senderId: userId,
				senderNickname: users.find((findUser) => findUser.id === userId)?.nickname || '',
				recipientId: u.id,
				recipientNickname: u.nickname,
				lastMessageTimestamp: moment().unix(),
			},
			userId: userId,
		})
	};

	const deleteConversation = (conversationId: number) => {
		deleteConversationById({
			conversationId,
		})
	};

	const onMessagesSelection = (conversation: Conversation) => {
		setSenderNickname(conversation.senderNickname);
		setRecipientNickname(conversation.recipientNickname);
	}

	React.useEffect(() => {
		getConversationByUserId({ userId })
			.then((response) => {
				const data = response.data as Conversation[];
				setConversations(data);
			})

		getUserById({ userId })
			.then((response) => {
				const data = response.data as User;
				setUser(data);
			})
	}, [userId]);

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