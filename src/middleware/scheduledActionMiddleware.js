import moment from 'moment';

const prefix = value => `@@scheduler/${value}`;
const createAction = type => payload => ({ type, payload });
const hasOwnProperties = (obj, props) => props.every(prop => obj.hasOwnProperty(prop));

export const SCHEDULE = prefix('SCHEDULE');
export const schedule = (id, payload) => createAction(SCHEDULE)({ id, ...payload });

export const DESCHEDULE = prefix('DESCHEDULE');
export const deschedule = id => createAction(DESCHEDULE)({ id });

export const RESCHEDULE = prefix('RESCHEDULE');
export const reschedule = (id, at) => createAction(RESCHEDULE)({ id, at });

export const TICK = prefix('TICK');
export const tick = createAction(TICK);

export const START = prefix('START');
export const start = createAction(START);

export const STOP = prefix('STOP');
export const stop = createAction(STOP);

const schedulerTimer = (store) => {
    if (typeof (window) !== 'undefined') {
        return setInterval(() => { store.dispatch(tick(moment().format())); }, 1000);
    }
    return null;
};

export default () => {
    let scheduledActions = [];
    let isProcessing = false;
    let timer = null;
    return store => next => ({ type, payload }) => {
        switch (type) { // eslint-disable-line
            case START:
                timer = schedulerTimer(store);
                return;
            case STOP:
                timer && clearInterval(timer);
                timer = null;
                return;
            case SCHEDULE:
                if (
                    hasOwnProperties(payload, ['action', 'at']) ||
                    hasOwnProperties(payload, ['action', 'every'])
                ) {
                    scheduledActions = [
                        ...scheduledActions,
                        { ...payload, lastRun: moment().format() },
                    ];
                }
                return;
            case RESCHEDULE:
                if (hasOwnProperties(payload, ['at', 'id'])) {
                    scheduledActions = scheduledActions.map(item => ((item.id === payload.id) ? { ...item, at: payload.at } : item));
                }
                return;
            case DESCHEDULE:
                if (payload.hasOwnProperty('id')) {
                    scheduledActions = scheduledActions.filter(item => item.id !== payload.id);
                }
                return;
            case TICK: {
                if (isProcessing) { return; }
                isProcessing = true;
                // ok we have a tick, lets see if we have any items in schedule we need to dispatch
                const processedActions = { at: [], every: [] };

                scheduledActions.forEach(
                    (item) => {
                        if (item.hasOwnProperty('at')) {
                            const nextRun = moment(item.at).diff(payload); // payload for a 'TICK' action is now in moment().format() time
                            const isRunnable = (nextRun < 500);

                            if (!item.processing && isRunnable) {
                                const action = (typeof item.action === 'function')
                                    ? item.action(moment().format())
                                    : item.action;
                                store.dispatch({ ...action, '@@schedulerItemId': item.id });

                                processedActions.at.push(item.id);
                            }
                        } else if (item.hasOwnProperty('every')) {
                            const nextRun = moment(moment(item.lastRun).add(item.every, 'seconds')).diff(payload); // payload for a 'TICK' action is now in moment().format() time
                            const isRunnable = (nextRun < 500);

                            if (!item.processing && isRunnable) {
                                const action = (typeof item.action === 'function')
                                    ? item.action(moment().format())
                                    : item.action;
                                store.dispatch({ ...action, '@@schedulerItemId': item.id });

                                processedActions.every.push(item.id);
                            }
                        }
                    },
                );

                scheduledActions = scheduledActions.filter(item => (processedActions.at.indexOf(item.id) === -1)).map(
                    item => ((processedActions.every.indexOf(item.id) !== -1) ? { ...item, lastRun: moment().format() } : item),
                );

                isProcessing = false;

                return;
            }
        }
        next({ type, payload });
    };
};
