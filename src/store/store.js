import { createStore, combineReducers, applyMiddleware } from 'redux';
import login from './reducers/login';
import thunk from 'redux-thunk';

const reducer = combineReducers({
    login
});


const store = createStore(reducer, applyMiddleware(thunk));

export default store;