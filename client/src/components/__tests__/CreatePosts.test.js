import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from '../../store';
import CreatePosts from '../pages/CreatePosts';

it ('renders without crashing', () => {
  const div = document.createElement('div');
  <Provider store={store}>
  ReactDOM.render(<CreatePosts />,div);
  </Provider>
  ReactDOM.unmountComponentAtNode(div);
});