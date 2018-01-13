import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/of';
import { combineEpics } from 'redux-observable';

const createAction = type => payload => ({ type, payload });

const FETCH_REPORT_BEGIN = 'FETCH_REPORT_BEGIN';
const FETCH_REPORT_COMPLETE = 'FETCH_REPORT_COMPLETE';
const FETCH_REPORT_ERROR = 'FETCH_REPORT_ERROR';
const FETCH_REPORT_CANCEL = 'FETCH_REPORT_CANCEL';

export const fetchReportBegin = createAction(FETCH_REPORT_BEGIN);
export const fetchReportCancel = createAction(FETCH_REPORT_CANCEL);
export const fetchReportComplete = createAction(FETCH_REPORT_COMPLETE);
export const fetchReportError = createAction(FETCH_REPORT_ERROR);

export const epics = combineEpics(
    (action$, _, { ajax }) =>
        action$.ofType(FETCH_REPORT_BEGIN)
            .switchMap(
                () => ajax.getJSON('https://s3.amazonaws.com/cdn.clearscore.com/native/interview_test/creditReportInfo.json')
                    .map(response => fetchReportComplete(response))
                    .catch(error => Observable.of(fetchReportError(error)))
                    .takeUntil(action$.ofType(FETCH_REPORT_CANCEL)),
            ),
);


export const initialState = {
    isFetching: false,
    data: {},
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case FETCH_REPORT_BEGIN:
            return {
                ...state,
                isFetching: true,
            };

        case FETCH_REPORT_COMPLETE:
            return {
                ...state,
                isFetching: false,
                data: payload,
            };

        case FETCH_REPORT_ERROR:
        case FETCH_REPORT_CANCEL:
            return initialState;

        default:
            return state;
    }
};
