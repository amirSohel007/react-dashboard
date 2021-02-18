import { LOGGING_IN, LOGGED_IN, LOGIN_ERROR, LOGOUT } from '../actions/actionTypes';
const key = 'login_state';

const INITIAL_STATE = getOldState() || {
	isLoggedIn: false,
	isLoggingIn: false,
	loginError: undefined,
};

export default function (state = INITIAL_STATE, action) {
	switch (action.type) {
		case LOGGING_IN:
			return setLocalStorageAndReturn({ ...state, isLoggedIn: false, isLoggingIn: true });

		case LOGGED_IN:
			return setLocalStorageAndReturn({ ...state, isLoggedIn: true, isLoggingIn: false });

		case LOGIN_ERROR:
			return setLocalStorageAndReturn({
				...state,
				isLoggedIn: false,
				isLoggingIn: false,
				loginError: action.error,
			});

		case LOGOUT:
			localStorage.clear();
			return setLocalStorageAndReturn({ ...state, isLoggedIn: false });

		default:
			return state;
	}
}

function getOldState() {
	const state = localStorage.getItem(key);
	if (state) {
		return JSON.parse(state);
	} else {
		return null;
	}
}

function setLocalStorageAndReturn(updateState) {
	localStorage.setItem(key, JSON.stringify(updateState));
	return updateState;
}
