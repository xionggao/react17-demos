/**
 * 应用根组件
 * @author xg
 */
import React from 'react';
import '../asserts/styles/index.less'; // 引入全局样式文件

export default (props)=>{
    return <>{props.children}</>;
}
