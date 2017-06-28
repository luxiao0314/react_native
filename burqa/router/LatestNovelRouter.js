/**
 * Created by luthor on 28/06/2017.
 */
import React, {Component} from 'react'
import {
    View, StyleSheet,
    Text, Image
} from 'react-native'
import Scene from "react-native-router-flux/src/Scene";
import {getSceneStyle} from "./CommentRouter";
import * as Platform from "react-native";
import NovelDesPage from "../pages/novel/NovelDesPage";
import LatestNovelPage from "../pages/novel/LatestNovelPage";
import AnimeNewsPages from "../pages/novel/AnimeNewsPages";
import Comment from "../pages/comment/Comment";
import CommentDetails from "../pages/comment/CommentDetails";
import NovelReadListPage from "../pages/novel/NovelReadListPage";
import NovelPhotoView from "../pages/novel/NovelPhotoView";
import Router from "react-native-router-flux/src/Router";

export default class LatestNovelRouter extends Component {
    render() {
        return (
            <Router key="root"
                    backAndroidHandler={true}
                    getSceneStyle={getSceneStyle}
                    hideNavBar={false}
                    hideTabBar={true}
                    titleStyle={{color: 'white'}} //统一title颜色
                    navigationBarStyle={{
                        backgroundColor: '#FF9800',
                        height: Platform.OS === 'android' ? 54 : 64
                    }}>
                <Scene key="latestNovelPage" component={LatestNovelPage} title="最新小说"/>
                <Scene key="novelDesPage" component={NovelDesPage}/>  /*小说详情*/
                <Scene key="novelReadListPage" component={NovelReadListPage}/>  /**分组列表*/
                <Scene key="comment" component={Comment} title="评论"/>
                <Scene key="novelPhotoView" component={NovelPhotoView} hideNavBar={true}/>  /**看小说页面*/
            </Router>
        )
    }
}