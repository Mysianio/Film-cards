import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import reducer from './reducers/index.js';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import List from './components/List.js'

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <List/>
  </Provider>,
  document.getElementById('root')
);
