import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from '../../store';
import Register from '../pages/Register'

it ('renders without crashing', () => {
    const div = document.createElement('div');
    <Provider store={store}>
    ReactDOM.render(<Register />,div);
    </Provider>
    ReactDOM.unmountComponentAtNode(div);
});