import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Avatar, Grid } from '@mui/material';
import { Conversation } from '../../api/conversationsApi';
import { stringToColour } from '../../helpers';
import { Message } from '../../api/messagesApi';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

interface IMessagesProps {
	messages: Message[]
	senderNickname: string
	recipientNickname: string
}

const Messages = ({
	messages,
	senderNickname,
	recipientNickname,
}: IMessagesProps) => {
	const { t } = useTranslation();

	return (
		<>

			<div className="header">
				<QuestionAnswerIcon />
				<span>{t('fromTo', { from: senderNickname, to: recipientNickname })}</span>
			</div>

			<Grid item xs={12}>
				{messages.map((m) => (
					<div>{m.body}</div>
					// <Grid container className='conversation' key={`${c.senderId}${c.recipientId}`} alignItems="center">
					// 	<Link to={`/messages/${c.id}`} >
					// 		<Grid item xs={2}>
					// 			<Avatar sx={{ bgcolor: stringToColour(c.recipientNickname) }}>
					// 				{c.recipientNickname.substring(0, 2).toUpperCase()}
					// 			</Avatar>
					// 		</Grid>
					// 		<Grid item xs={5} sm={2} className='conversation-name'>
					// 			{c.recipientNickname}
					// 		</Grid>
					// 		<Grid item xs={12} sm={8} className='conversation-time'>
					// 			<i>{t('lastMessageTimestamp')} {moment(c.lastMessageTimestamp).fromNow()}</i>
					// 		</Grid>
					// 	</Link>
					// </Grid>
				))
				}
			</Grid>
		</>
	)
}

export default Messages;
