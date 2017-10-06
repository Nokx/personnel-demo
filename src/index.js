import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';
import 'babel-polyfill';

import App from './App';
import configureStore from './common/configureStore';
import auth from './features/auth';

const store = configureStore();

// проверить наличие токена нужно до загрузки контента
const token = localStorage.getItem('personnel_token');
if (token) {
  store.dispatch(auth.actions.getAuthUser());
}

const rootEl = document.getElementById('root');
const render = Component =>
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    rootEl,
  );

render(App);
if (module.hot) {
  module.hot.accept('./App', () => render(App));
}
