import { combineReducers } from 'redux';
import courses from './courseReducer';
import authors from './authorReducer';
import modelos from './modeloReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  courses,
  authors,
  modelos,
  ajaxCallsInProgress
});

export default rootReducer;
