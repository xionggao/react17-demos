/**
 * 工程入口文件
 * @author xg
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Routes from './routes';
import store from './store';

ReactDOM.render(
    <Provider store={store}>{Routes}</Provider>,
    document.getElementById('root')
);
