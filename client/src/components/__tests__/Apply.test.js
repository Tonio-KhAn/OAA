import React from 'react'
import Apply from '../pages/Apply'
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from '../../store';



test('renders and uploads file', () => {
    
    const div = document.createElement('div');
    <Provider store={store}>
    ReactDOM.render(<Apply />,div);
    </Provider>
  ReactDOM.unmountComponentAtNode(div);
})