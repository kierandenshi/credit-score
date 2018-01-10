import React from 'react';
import { Provider } from 'react-redux';
import createStore from '@redux/create';
import '@css/main.scss';

const store = createStore();

export default () => (
    <Provider store={store}>
        <div>hello</div>
    </Provider>
);
