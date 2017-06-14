/**
 * Created by luthor on 07/06/2017.
 */

import React, {Component} from 'react'
import {
    View,
    AppRegistry
} from 'react-native'

import Comment from "./pages/comment/Comment";
import {Navigator} from 'react-native-deprecated-custom-components'
import UpdatePages from "./pages/UpdatePages";

export default class App extends Component {

    render() {
        return (
            <View style={{flex: 1}}>
                <Navigator
                    initialRoute={{component: UpdatePages}}
                    configureScene={this.configureScene}
                    renderScene={this.renderScene}
                />
            </View>
        )
    }

    //配置场景动画(configureScene): 根据路由的type属性, 判断使用的动画样式, 底部弹出或右侧弹出.
    configureScene = route => {
        if (route.sceneConfig) return route.sceneConfig;
        return {
            ...Navigator.SceneConfigs.HorizontalSwipeJump,
            gestures: {}    // 禁用左滑返回手势
        }
    };

    //渲染场景(renderScene): 使用动态加载组件的方式. 设置加载页面的navigator参数, 其余使用route.passProps属性传递其他参数.
    renderScene = (route, navigator) => {
        let Component = route.component;
        return <Component {...route.passProps} navigator={navigator}/>;
    }
}

AppRegistry.registerComponent('iShiWuPai', () => App);
