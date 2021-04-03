import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from '../../store';
import CreatePosts from '../tabs/CreatePosts';

it ('renders without crashing', () => {
  const div = document.createElement('div');
  <Provider store={store}>
  ReactDOM.render(<CreatePosts />,div);
  </Provider>

  ReactDOM.unmountComponentAtNode(div);
});