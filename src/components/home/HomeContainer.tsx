import React from "react";
import Home from "./Home";
import { getAllUsers, User } from "../../api/usersApi";

const HomeContainer = () => {
	const [users, setUsers] = React.useState<User[]>([]);

	React.useEffect(() => {
		getAllUsers()
			.then((response) => {
				const data = response.data as User[];
				setUsers(data);
			})
	}, []);

	const props = {
		users
	}

	return <Home {...props} />
}

export default HomeContainer;