import Axios from 'axios';

let getLocalStroageToken = () => localStorage.getItem('token');

const BASE_URL = 'https://api.ecosense-enviro.com';

export const no_auth_axios = Axios.create({
	baseURL: BASE_URL,
	timeout: 0,
});

export const axios_auth = Axios.create({
	baseURL: BASE_URL,
	timeout: 0,
	transformRequest: [
		function (data, headers) {
			headers['Authorization'] = `Bearer ${getLocalStroageToken()}`;
			return JSON.stringify(data);
		},
	],
	headers: {
		'Content-Type': 'application/json',
		type: 'with-auth',
	},
});
