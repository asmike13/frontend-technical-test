import moment from "moment";
import { CSSProperties } from "react";
import { useTranslation } from "react-i18next";

import './styles.scss';

const bubbleStyle = (isSender: boolean): CSSProperties => ({
	color: isSender ? 'white' : 'black',
	backgroundColor: isSender ? '#2096f3' : '#e8e8ea',
});

interface BubbleProps {
	from: 'sender' | 'recipient'
	body: string
	authorNickname?: string
	samePrevious: boolean
	timestamp: string
}

const Bubble = ({
	from,
	body,
	authorNickname,
	samePrevious,
	timestamp,
}: BubbleProps) => {
	const { t } = useTranslation();

	const isSender = from === 'sender';

	return (
		<div className="bubble-container" style={{ justifyContent: isSender ? 'flex-end' : 'flex-start' }}>
			{!isSender && !samePrevious && <span className="author">{authorNickname}</span>}
			<div className="bubble" style={bubbleStyle(isSender)}>{body}</div>
			<i>{moment(Number(timestamp) * 1000).fromNow()}</i>
		</div >
	);
};

export default Bubble;