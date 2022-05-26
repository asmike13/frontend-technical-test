import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { Message } from '../../api/messagesApi';
import Bubble from '../commons/bubble/Bubble';

interface IMessagesProps {
	messages: (Message & {
		authorNickname?: string,
		from: 'sender' | 'recipient'
		samePrevious: boolean
	})[]
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
				{messages.map((m, i) => <Bubble {...m} />)}
			</Grid>
		</>
	)
}

export default Messages;
