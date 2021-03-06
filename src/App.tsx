import React from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import moment from 'moment';
import { Button, Container } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { setLangage } from './i18next';

import Home from './components/home/HomeContainer';
import Conversations from './components/conversations/ConversationsContainer';
import Messages from './components/messages/MessagesContainer';
import NotFound from './components/commons/404/NotFound';
// @ts-ignore
import localization from 'moment/locale/fr';

import './App.scss';

moment.updateLocale('fr', localization);
setLangage('fr');

const App = () => {
	const { t } = useTranslation();

	const [senderNickname, setSenderNickname] = React.useState('');
	const [recipientNickname, setRecipientNickname] = React.useState('');

	const conversationsProps = {
		setSenderNickname,
		setRecipientNickname,
	};

	const messagesProps = {
		senderNickname,
		recipientNickname,
	};

	return (
		<div className="App">
			<Router>
				<header>
					<Link to="/">
						<Button startIcon={<HomeIcon />}>{t("nav.home")}</Button>
					</Link>
				</header>
				<Container fixed>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/conversations" element={<NotFound text={t('no userId')} />} />
						<Route path="/conversations/:userId" element={<Conversations {...conversationsProps} />} />
						<Route path="/messages" element={<NotFound text={t('no conversationId')} />} />
						<Route path="/messages/:userId/:conversationId" element={<Messages {...messagesProps} />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Container>
			</Router>
		</div >
	);
}

export default App;
