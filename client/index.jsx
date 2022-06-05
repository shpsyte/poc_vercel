// Startup point for the client side application
import 'react-circular-progressbar/dist/styles.css';
import '@draft-js-plugins/mention/lib/plugin.css';

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import axios from 'axios';

import { ThemeProvider } from 'styled-components';
import Routes from './routes';
import { Theme } from './styles/theme';
import reducers from './reducers';

export const UnLoggedUser = {
  id: -1,
  email: '',
  name: '',
  surname: '',
  fullName: '',
  cb: () => {},
};

const axiosInstance = axios.create({
  baseURL: '/access',
});

window.INITIAL_STATE = {};

const User = { id: -1, email: '' };

const store = createStore(
  reducers,
  { User },
  applyMiddleware(thunk.withExtraArgument(axiosInstance)),
);

const Hub = 'asdasd';

ReactDOM.hydrate(
  <Provider store={store}>
    <ThemeProvider theme={Theme}>
      <BrowserRouter>
        <div>{renderRoutes(Routes, { Hub })}</div>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>,
  document.querySelector('#root'),
);

export default store;
