import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { createEpicMiddleware } from 'redux-observable';
import scheduledActionMiddleware, { start } from '@middleware/scheduledActionMiddleware';
import { ajax } from 'rxjs/observable/dom/ajax';
import { isDev } from '@environment';

import rootReducer, { epics as rootEpic } from '@redux';

const epicMiddleware = createEpicMiddleware(rootEpic, {
    dependencies: { ajax },
});

const enableHMR = (store) => {
    if (isDev() && module.hot) {
        module.hot.accept('@redux', () => {
            store.replaceReducer(rootReducer);
            epicMiddleware.replaceEpic(rootEpic);
        });
    }
};

export default () => {
    const composeEnhancers = isDev() ? composeWithDevTools({}) : compose;

    const store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(
            epicMiddleware,
            scheduledActionMiddleware(),
        )),
    );

    enableHMR(store);

    store.dispatch(start()); // start the scheduledActionMiddleware timer

    return store;
};
