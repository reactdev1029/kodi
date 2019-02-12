import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import Auth from './Auth';
import Settings from './Settings';
import Content from './Content';

const reducers = combineReducers({
  routing: routerReducer,
  auth: Auth,
  settings: Settings,
  content: Content,
});

export default reducers;
