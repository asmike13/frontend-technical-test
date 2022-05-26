import { useTranslation } from "react-i18next";
import HomeIcon from '@mui/icons-material/Home';
import { User } from "../../api/usersApi";
import Avatar from "../commons/Avatar";
import { Link } from "react-router-dom";

import './styles.scss';

interface IHomeProps {
	users: User[]
}

const Home = ({ users }: IHomeProps) => {
	const { t } = useTranslation();

	return (
		<>
			<div className="header">
				<HomeIcon />
				<span>{t('home')}</span>
			</div>

			<div className="users-container">
				{users.map((u) => (
					<Link to={`/conversations/${u.id}`} key={u.id}>
						<Avatar str={u.nickname} />
					</Link>
				))}
			</div>
		</>
	)
}

export default Home;
