import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Grid, TextField } from '@mui/material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { Message } from '../../api/messagesApi';
import Bubble from '../commons/bubble/Bubble';
import EditIcon from '@mui/icons-material/Edit';

import './styles.scss';

export interface IMessagesProps {
	messages: (Message & {
		authorNickname?: string,
		from?: 'sender' | 'recipient'
		samePrevious?: boolean
	})[]
	senderNickname: string
	recipientNickname: string
	onSendMessage: (message: string) => void
	onDeleteMessage: (messageId: number) => void
}

const Messages = ({
	messages,
	senderNickname,
	recipientNickname,
	onSendMessage,
	onDeleteMessage,
}: IMessagesProps) => {
	const { t } = useTranslation();

	const [message, setMessage] = React.useState('');
	const [editMode, setEditMode] = React.useState(false);

	return (
		<>

			<div className="header">
				<QuestionAnswerIcon />
				<span>{t('fromTo', { from: senderNickname, to: recipientNickname })}</span>
				<EditIcon style={{ marginLeft: '5px', cursor: 'pointer' }} onClick={() => setEditMode(!editMode)} />
			</div>

			{messages.map((m, i) => <Bubble key={m.id} {...m} editMode={editMode} onDelete={() => onDeleteMessage(m.id)} />)}

			<Grid container className="form-container">

				<Grid item xs={9}>
					<TextField variant="outlined" label="Message" onChange={(event) => setMessage(event.target.value)} />
				</Grid>

				<Grid item xs={3}>
					<Button onClick={() => onSendMessage(message)} >{t("send")}</Button>
				</Grid>

			</Grid>
		</>
	)
}

export default Messages;
