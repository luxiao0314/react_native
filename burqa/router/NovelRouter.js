/**
 * Created by lucio on 19/06/2017.
 */
import React, {Component} from 'react'
import {Platform} from 'react-native'
import Router from "react-native-router-flux/src/Router";
import Scene from "react-native-router-flux/src/Scene";
import FindNovelSubPage from "../pages/novel/FindNovelSubPage";
import FindNovelPage from "../pages/novel/FindNovelPage";
import AnimeNewsPages from "../pages/novel/AnimeNewsPages";
import Comment from "../pages/comment/Comment";
import CommentDetails from "../pages/comment/CommentDetails";
import UpdatePages from "../pages/UpdatePages";

/**
 * @Description 找小说路由
 * @Author lucio
 * @Email lucio0314@163.com
 * @Date 19/06/2017 11:34 PM
 * @Version 11:34 PM
 */
export default class NovelRouter extends Component {
    render() {
        return (
            <Router key="root"
                    getSceneStyle={getSceneStyle}
                    hideNavBar={false}
                    hideTabBar={true}
                    titleColor="white"
                    navigationBarStyle={{
                        backgroundColor: '#FF9800',
                        height: Platform.OS === 'android' ? 54 : 64
                    }}>
                <Scene key="findNovelPage" component={FindNovelPage} title="小说分类" titleColor="white"/>
                <Scene key="findNovelSubPage" component={FindNovelSubPage} title="小说分类"/>
            </Router>
        );
    }
}

const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
    const style = {
        flex: 1,
        backgroundColor: '#fff',
        shadowColor: null,
        shadowOffset: null,
        shadowOpacity: null,
        shadowRadius: null,
    };
    if (computedProps.isActive) {
        style.marginTop = computedProps.hideNavBar ? (Platform.OS === 'android' ? 0 : 20) : (Platform.OS === 'android' ? 54 : 64);
        style.marginBottom = computedProps.hideTabBar ? 0 : 50;
    }
    return style;
};
