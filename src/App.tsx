import React from 'react';
import './App.css';
import Conversations from './components/conversations/ConversationsContainer';
import moment from 'moment';
import { setLangage } from './i18next';
import { Container } from '@mui/material';

moment.locale('fr');
setLangage('fr');

const App = () => {
	return (
		<div className="App">
			<Container fixed>
				<Conversations />
			</Container>
		</div>
	);
}

export default App;
