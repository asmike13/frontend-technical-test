import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Grid } from '@mui/material';
import { Conversation } from '../../api/conversationsApi';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DeleteIcon from '@mui/icons-material/Delete';
import Avatar from '../commons/avatar/Avatar';
import { User } from '../../api/usersApi';

import './styles.scss';

export interface IConversationsProps {
	conversations: Conversation[]
	userNickname: string
	onMessagesSelection: (conversation: Conversation) => void
	onClickNewConversation: () => void
	createNewConversation: (user: User) => void
	deleteConversation: (conversationId: number) => void
	userId?: string
	users?: User[]
}

const Conversations = ({
	conversations,
	userNickname,
	onMessagesSelection,
	onClickNewConversation,
	createNewConversation,
	deleteConversation,
	userId,
	users,
}: IConversationsProps) => {
	const { t } = useTranslation();

	const [newConversation, setNewConversation] = React.useState(false);

	return (
		<>
			<div className="header">
				<FormatListBulletedIcon />
				<span>{t('conversations', { userNickname })}</span>
			</div>

			<Button onClick={() => {
				setNewConversation(!newConversation)
				!newConversation && onClickNewConversation()
			}}>
				{!newConversation && t("add conversation", { name: userNickname })}
				{newConversation && t("cancel")}
			</Button>

			{newConversation && users && users.length > 0 && (
				<div>
					{t("new conversation")}
					<div className="users-container">
						{users.map((u) => u.id !== Number(userId) && (
							<button onClick={() => createNewConversation(u)} key={u.id}>
								<Avatar str={u.nickname} />
								{u.nickname}
							</button>
						))}
					</div>
				</div>
			)}

			<Grid item xs={12} className="conversation-container">

				{conversations.map((c) => (c.senderId &&
					<Link to={`/messages/${userId}/${c.id}`} key={c.lastMessageTimestamp} onClick={() => onMessagesSelection(c)}>
						<Grid container className='conversation' alignItems="center">

							<Grid item xs={3} sm={2}>
								<Avatar str={c.recipientNickname} />
							</Grid>

							<Grid item xs={9} sm={5} className='conversation-name'>
								{t("fromTo", { from: c.senderNickname, to: c.recipientNickname })}
							</Grid>

							<Grid item xs={12} sm={5} className='conversation-time'>
								<i>{moment(c.lastMessageTimestamp).fromNow()}</i>
								{c.senderId === Number(userId) && (
									<DeleteIcon onClick={(e) => {
										e.preventDefault()
										deleteConversation(c.id);
									}} />
								)}
							</Grid>


						</Grid>
					</Link>
				))}
			</Grid>
		</>
	)
}

export default Conversations;
