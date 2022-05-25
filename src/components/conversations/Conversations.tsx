import React from 'react';
import moment from 'moment';
import { Conversation } from '../../api/conversationsApi';
import { stringToColour } from '../../helpers';
import { useTranslation } from 'react-i18next';
import { Avatar, Grid } from '@mui/material';

import './styles.scss';

interface IConversationsProps {
	conversations: Conversation[]
}

const Conversations = ({
	conversations
}: IConversationsProps) => {
	const { t } = useTranslation();

	return (
		<>
			<Grid item xs={12}>
				{conversations.map((c) => (c.senderId &&
					<Grid container className='conversation' key={`${c.senderId}${c.recipientId}`} alignItems="center">
						<Grid item xs={2}>
							<Avatar sx={{ bgcolor: stringToColour(c.recipientNickname) }}>
								{c.recipientNickname.substring(0, 2).toUpperCase()}
							</Avatar>
						</Grid>
						<Grid item xs={5} sm={2} className='conversation-name'>
							{c.recipientNickname}
						</Grid>
						<Grid item xs={12} sm={8} className='conversation-time'>
							<i>{t('lastMessageTimestamp')} {moment(c.lastMessageTimestamp).fromNow()}</i>
						</Grid>
					</Grid>
				))
				}
			</Grid>
		</>
	)
}

export default Conversations;
