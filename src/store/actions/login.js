import axios from 'axios';
import { no_auth_axios } from '../../api';
import { LOGGING_IN, LOGGED_IN, LOGIN_ERROR } from './actionTypes';

export const login = data => {
    return (dispatch) => {
        dispatch({ type: LOGGING_IN });
        return no_auth_axios
            .post('/auth/login', data)
            .then(response => {
                if (localStorage.getItem('token')){
                    dispatch({
                        type: LOGGED_IN,
                        constants: response.data,
                    });
                }
                dispatch({
                    type: LOGGED_IN,
                    constants: response.data,
                });
                if (response.data) {
					// addToast('Logged in sucessfully', {
					// 	appearance: 'success',
					// 	autoDismiss: true,
					// });
					// history.push('/admin/home');
					const { access_token } = response.data;
					localStorage.setItem('token', access_token);
				}
                return response.data;
            })
            .catch((err) => {
                dispatch({ type: LOGIN_ERROR, error: 'ERROR' });
				// addToast(err?.message, {
				// 	appearance: 'error',
				// 	autoDismiss: true,
				// });
			});
    };
    
}