import React from 'react';
import { Provider } from 'react-redux';
import '@css/main.scss';
import CreditReport from '@components/CreditReport';
import createStore from './store';

const store = createStore();

export default () => (
    <Provider store={store}>
        <CreditReport />
    </Provider>
);
