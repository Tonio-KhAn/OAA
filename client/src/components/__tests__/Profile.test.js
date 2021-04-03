import React from 'react';
import ReactDOM from 'react-dom';
import Profile from '../pages/Profile';
import {Provider} from 'react-redux';
import store from '../../store';

it ('renders without crashing', () => {
    const div = document.createElement('div');
    <Provider store={store}>
    ReactDOM.render(<Profile />,div);
    </Provider>
    ReactDOM.unmountComponentAtNode(div);
});