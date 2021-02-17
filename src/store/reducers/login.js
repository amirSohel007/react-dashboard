import { LOGGING_IN, LOGGED_IN, LOGIN_ERROR, LOGOUT } from '../actions/actionTypes';

const INITIAL_STATE = {
    isLoggedIn: false,
};

export default function(state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOGGING_IN: 
            return { ...state, isLoggedIn: false, isLoggingIn: true };

        case LOGGED_IN: 
            return { ...state, isLoggedIn: true, isLoggingIn: false };

        case LOGIN_ERROR:
            return { ...state, isLoggedIn: false, isLoggingIn: false, loginError: action.error };
        
        case LOGOUT: 
            localStorage.clear();
            return { ...state, isLoggedIn: false}

        default: 
            return state;
    }
}