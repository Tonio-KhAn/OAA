import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from '../../store';
import Reports from '../admin/reports';

it ('renders without crashing', () => {
    const div = document.createElement('div');
    <Provider store={store}>
    ReactDOM.render(<Reports />,div);
    </Provider>
    ReactDOM.unmountComponentAtNode(div);
});