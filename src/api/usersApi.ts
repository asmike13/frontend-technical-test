import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL_API;

export interface User {
	id: number
	nickname: string
	token: string
}

export const getAllUsers = () => {
	return axios.get(`${baseUrl}/users`);
}

export const getUserById = (payload: { userId: number }) => {
	return axios.get(`${baseUrl}/users/${payload.userId}`);
}