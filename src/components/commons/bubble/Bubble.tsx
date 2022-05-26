import moment from "moment";
import { CSSProperties } from "react";
import DeleteIcon from '@mui/icons-material/Delete';

import './styles.scss';

const bubbleStyle = (isSender: boolean): CSSProperties => ({
	color: isSender ? 'white' : 'black',
	backgroundColor: isSender ? '#2096f3' : '#e8e8ea',
});

export interface BubbleProps {
	body: string
	authorNickname?: string
	timestamp: string
	samePrevious?: boolean
	from?: 'sender' | 'recipient'
	editMode?: boolean
	onDelete?: () => void
}

const Bubble = ({
	from,
	body,
	authorNickname,
	samePrevious,
	timestamp,
	editMode,
	onDelete,
}: BubbleProps) => {
	const isSender = from === 'sender';

	return (
		<div className="bubble-container" style={{ justifyContent: isSender ? 'flex-end' : 'flex-start' }}>
			{!isSender && !samePrevious && <span className="author">{authorNickname}</span>}
			<div className="bubble" style={bubbleStyle(isSender)}>{body}</div>
			<i>{moment(Number(timestamp) * 1000).fromNow()}</i>
			{editMode && isSender && (
				<DeleteIcon onClick={(e) => {
					e.preventDefault()
					onDelete && onDelete();
				}} />
			)}
		</div >
	);
};

export default Bubble;