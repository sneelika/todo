import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import userReducer from './user/userReducers';
import {composeWithDevTools} from 'redux-devtools-extension'; //
import logger from 'redux-logger';
const rootReducer = combineReducers({
  user: userReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, logger)),
);

export default store;
