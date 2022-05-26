import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL_API;

export interface Message {
	id: number
	conversationId: number
	authorId: number
	body: string
	timestamp: string
}

interface MessageBody {
	conversationId: number
	authorId: number
	body: string
	timestamp: string
}

export const getMessagesByConversationId = (payload: { conversationId: number }) => {
	return axios.get(`${baseUrl}/messages/${payload.conversationId}`);
}

export const postMessagesByConversationId = (payload: { message: MessageBody, conversationId: number }) => {
	return axios.post(`${baseUrl}/messages/${payload.conversationId}`, payload.message);
}

export const deleteMessageById = (payload: { messageId: number }) => {
	return axios.delete(`${baseUrl}/message/${payload.messageId}`);
}