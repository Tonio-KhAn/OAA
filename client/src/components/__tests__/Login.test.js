import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from '../../store';
import Login from '../pages/Login'

it ('renders without crashing', () => {
    const div = document.createElement('div');
    <Provider store={store}>
    ReactDOM.render(<Login />,div);
    </Provider>
    ReactDOM.unmountComponentAtNode(div);
});