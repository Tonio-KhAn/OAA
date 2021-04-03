import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from '../../store';
import Chat from '../pages/Chat';

it ('renders without crashing', () => {
  const div = document.createElement('div');
  <Provider store={store}>
  ReactDOM.render(<Chat />,div);
  </Provider>

  ReactDOM.unmountComponentAtNode(div);
});