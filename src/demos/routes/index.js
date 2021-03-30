/**
 * 路由配置
 * @author xg
 */
import React, {Suspense, lazy} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom';

const App = lazy(() => import('../pages/App'));
const TestPage = lazy(() => import('../modules/TestPage'));
const TestPage2 = lazy(() => import('../modules/TestPage2'));
const Routes = (
    <BrowserRouter>
        <Suspense fallback={<div>Loading</div>}>
            <React.StrictMode>
                <App>
                    <Switch>
                        <Route path="/" exact component={TestPage}/>
                    </Switch>
                    <Switch>
                        <Route path="/test2" component={TestPage2}/>
                    </Switch>
                </App>
            </React.StrictMode>
        </Suspense>
    </BrowserRouter>
);
export default Routes;
