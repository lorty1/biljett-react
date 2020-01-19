import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import './assets/sass/knacss.scss';

import App from "./container/app";
import reducers from "./reducers";

const invariant = require('redux-immutable-state-invariant').default()

const AuthMiddleWare = store => next => action => {
  if (action.type == 'ACCESS_FORBIDDEN') {
    if(!process.env.NODE_ENV || process.env.NODE_ENV == 'development') {
      return window.location = 'http://localhost:8000/admin/login'
    }else {
      return window.location = '/admin/login?next=/'
    }
  }
  next(action);
}
const createStoreWithMiddleware = applyMiddleware(thunk, invariant, AuthMiddleWare)(createStore);


ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(
      reducers,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <App />
  </Provider>,
  document.getElementById("root")
);