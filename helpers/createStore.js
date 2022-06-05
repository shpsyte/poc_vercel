// BACKEND STORE ONLY
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import reducers from '../client/reducers';

const User = { id: -1, email: '' };

let store = null;

export default () => {
  const axiosInstance = axios.create({
    baseURL: '/access',
  });

  if (!store)
    store = createStore(
      reducers,
      { User },
      applyMiddleware(thunk.withExtraArgument(axiosInstance)),
    );

  return store;
};
