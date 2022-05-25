import React from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import moment from 'moment';
import { Button, Container } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { setLangage } from './i18next';

import Home from './components/home/Home';
import Conversations from './components/conversations/ConversationsContainer';
import NotFound from './components/404/NotFound';

import './App.scss';

moment.locale('fr');
setLangage('fr');

const App = () => {
	const { t } = useTranslation();

	return (
		<div className="App">
			<Router>
				<header>
					<Link to="/">
						<Button startIcon={<HomeIcon />}>{t("nav.home")}</Button>
					</Link>
					<Link to="/conversations">
						<Button startIcon={<QuestionAnswerIcon />}>{t("nav.conversations")}</Button>
					</Link>
				</header>
				<Container fixed>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="conversations" element={<Conversations />} >
							<Route path=":senderId" element={<Conversations />} />
						</Route>
						<Route path="" element={<NotFound />} />
					</Routes>
				</Container>
			</Router>
		</div >
	);
}

export default App;
