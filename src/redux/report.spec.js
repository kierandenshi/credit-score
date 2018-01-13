import { ActionsObservable } from 'redux-observable';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toArray';

import reducer, {
    epics,
    fetchReportBegin,
    fetchReportComplete,
    fetchReportError,
    initialState,
} from './report';

describe('Fetch report data epic', () => {
    const action$ = ActionsObservable.of(fetchReportBegin());

    it('dispatches the correct action on success', () => {
        epics(action$, null, { ajax: { getJSON: () => Observable.of({ data: 'success' }) } }).toPromise()
            .then((actionReceived) => {
                expect(actionReceived).toEqual(fetchReportComplete({ data: 'success' }));
            });
    });

    it('dispatches the correct action on failure', () => {
        epics(action$, null, { ajax: { getJSON: () => Observable.throw({ data: 'failed' }) } }).toPromise()
            .then((actionReceived) => {
                expect(actionReceived).toEqual(fetchReportError({ data: 'failed' }));
            });
    });
});

describe('Report reducer', () => {
    it('should return the current state', () => {
        expect(reducer(initialState, { type: 'SOME_ACTION' })).toEqual(initialState);
    });
});
