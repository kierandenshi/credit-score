import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { createEpicMiddleware } from 'redux-observable';
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
        composeEnhancers(applyMiddleware(epicMiddleware)),
    );

    enableHMR(store);

    return store;
};
