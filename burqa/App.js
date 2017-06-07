/**
 * Created by luthor on 07/06/2017.
 */

import React, {Component} from 'react'
import {
    Animated,
    StyleSheet,
    View,
    Text,
    AppRegistry, StatusBar
} from 'react-native'

import Comment from "./pages/comment/Comment";
import {Navigator} from 'react-native-deprecated-custom-components'
import Router from "./pages/common/Router";

export default class App extends Component {

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar barStyle="light-content" />
                <Navigator
                    initialRoute={{component: Comment}}
                    configureScene={this.configureScene}
                    renderScene={this.renderScene}
                />
            </View>
        )
    }

    //配置场景动画(configureScene): 根据路由的type属性, 判断使用的动画样式, 底部弹出或右侧弹出.
    configureScene = route => {
        if (route.sceneConfig) return route.sceneConfig

        return {
            ...Navigator.SceneConfigs.PushFromRight,
            gestures: {}    // 禁用左滑返回手势
        }
    };

    //渲染场景(renderScene): 使用动态加载组件的方式. 设置加载页面的navigator参数, 其余使用route.passProps属性传递其他参数.
    renderScene = (route, navigator) => {
        // let Component = Router[route.id].default;
        // return <Component navigator={navigator} {...route.passProps}/>
        return <route.component navigator={navigator}  {...route.passProps} />;
    }
}
