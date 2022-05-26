import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Grid, TextField } from '@mui/material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { Message } from '../../api/messagesApi';
import Bubble from '../commons/bubble/Bubble';

import './styles.scss';

interface IMessagesProps {
	messages: (Message & {
		authorNickname?: string,
		from: 'sender' | 'recipient'
		samePrevious: boolean
	})[]
	senderNickname: string
	recipientNickname: string
	onSendMessage: (message: string) => void
}

const Messages = ({
	messages,
	senderNickname,
	recipientNickname,
	onSendMessage,
}: IMessagesProps) => {
	const { t } = useTranslation();

	const [message, setMessage] = React.useState('');

	return (
		<>

			<div className="header">
				<QuestionAnswerIcon />
				<span>{t('fromTo', { from: senderNickname, to: recipientNickname })}</span>
			</div>

			{messages.map((m, i) => <Bubble key={m.id} {...m} />)}

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
