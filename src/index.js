import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { isDev } from '@environment';
import App from './App.jsx';

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('root'),
    );
};

render(App);

if (isDev() && module.hot) {
    module.hot.accept('./App.jsx', () => {
        render(App);
    });
}
