import React from 'react';
import ReactDOM from 'react-dom';
import createSagaMiddleware from 'redux-saga';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from "react-redux";
import rootSaga from "./sagas";
import reducer from "./reducers";
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root'));

serviceWorker.unregister();
