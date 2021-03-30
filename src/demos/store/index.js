/**
 * redux-saga配置文件
 * @author xg
 */
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(rootSaga);
if (module.hot) { // webpack.HotModuleReplacementPlugin开启时有效
    module.hot.accept('../reducers', () => {
        const nextReducer = () => import('../reducers');
        store.replaceReducer(nextReducer);
    });
}
export default store;

