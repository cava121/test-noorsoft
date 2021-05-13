import { combineReducers } from 'redux';
import { recordReducer } from './recordReducer';

export const rootReducer = combineReducers({
  recordsPage: recordReducer,
});
