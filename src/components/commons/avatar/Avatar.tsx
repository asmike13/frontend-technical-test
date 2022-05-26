import { Avatar as MuiAvatar } from '@mui/material';
import { stringToColour } from '../../../helpers';

interface IAvatar {
	str: string
}

const Avatar = ({ str }: IAvatar) => {
	return (
		<MuiAvatar sx={{ bgcolor: stringToColour(str) }}>
			{str.substring(0, 2).toUpperCase()}
		</MuiAvatar>
	)
}

export default Avatar;