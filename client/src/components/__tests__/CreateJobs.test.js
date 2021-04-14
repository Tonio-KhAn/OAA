import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from '../../store';
import CreateJobs from '../pages/CreateJobs';

it ('renders without crashing', () => {
  const div = document.createElement('div');
  <Provider store={store}>
  ReactDOM.render(<CreateJobs />,div);
  </Provider>

  ReactDOM.unmountComponentAtNode(div);
});