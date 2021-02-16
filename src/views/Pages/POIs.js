import React, { useEffect } from 'react';
import { auth_axios } from '../../api';
export const POIs = () => {
	const fetchPoisData = async () => {
		const res = await auth_axios.get('/services/services/api/users');
		console.log('fetchPoisData -> res', res.data);
	};

	useEffect(() => {
		fetchPoisData();
	}, []);

	return <div>Pois</div>;
};
