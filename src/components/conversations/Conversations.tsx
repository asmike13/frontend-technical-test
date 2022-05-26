import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import { Conversation } from '../../api/conversationsApi';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Avatar from '../commons/avatar/Avatar';

import './styles.scss';

interface IConversationsProps {
	conversations: Conversation[]
	userNickname: string
	onMessagesSelection: (conversation: Conversation) => void
	userId?: string
}

const Conversations = ({
	conversations,
	userNickname,
	onMessagesSelection,
	userId,
}: IConversationsProps) => {
	const { t } = useTranslation();

	return (
		<>
			<div className="header">
				<FormatListBulletedIcon />
				<span>{t('conversations')} {userNickname}</span>
			</div>

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
							</Grid>

						</Grid>
					</Link>
				))
				}
			</Grid>
		</>
	)
}

export default Conversations;
