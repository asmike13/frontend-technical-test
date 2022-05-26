import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL_API;

export interface Conversation {
	id: number
	senderId: number
	senderNickname: string
	recipientId: number
	recipientNickname: string
	lastMessageTimestamp: number
}

export interface ConversationBody {
	senderId: number
	senderNickname: string
	recipientId: number
	recipientNickname: string
	lastMessageTimestamp: number
}

export const getConversationByUserId = (payload: { userId: number }) => {
	return axios.get(`${baseUrl}/conversations/${payload.userId}`);
}

export const postConversationByUserId = (payload: { conversation: ConversationBody, userId: number }) => {
	return axios.post(`${baseUrl}/conversations/${payload.userId}`, payload.conversation);
}

export const deleteConversationById = (payload: { conversationId: number }) => {
	return axios.delete(`${baseUrl}/conversations/${payload.conversationId}`);
}