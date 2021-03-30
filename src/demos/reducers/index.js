/**
 * 合并所有的reducer文件
 * @author xg
 */
import {combineReducers} from 'redux';
import example from "./example"

const reducers = combineReducers({
    example
});
export default reducers;
