import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from '../pages/Home';

it ('renders without crashing', () => {
    const div = document.createElement('div');
    <BrowserRouter>
    ReactDOM.render(<Home />,div);
    </BrowserRouter>
    ReactDOM.unmountComponentAtNode(div);
});