import { useTranslation } from "react-i18next";
import { User } from "../../api/usersApi";
import Avatar from "../commons/avatar/Avatar";
import { Link } from "react-router-dom";

interface IHomeProps {
	users: User[]
}

const Home = ({ users }: IHomeProps) => {
	const { t } = useTranslation();

	return (
		<>
			<span>{t('choose user')}</span>

			<div className="users-container">
				{users.map((u) => (
					<Link to={`/conversations/${u.id}`} key={u.id}>
						<Avatar str={u.nickname} />
						{u.nickname}
					</Link>
				))}
			</div>
		</>
	)
}

export default Home;
