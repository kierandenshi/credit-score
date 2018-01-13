import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import report, { epics as reportEpics } from './report';

export const epics = combineEpics(
    reportEpics,
);

export default combineReducers({
    report,
});

