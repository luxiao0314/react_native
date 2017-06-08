/**
 * Created by luthor on 07/06/2017.
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import NewCommentList from "./NewCommentList";
import HotCommentList from "./HotCommentList";
import ScrollableTabView, {DefaultTabBar} from "react-native-scrollable-tab-view";
import FeedsCategoryBar from "../../components/FeedsCategoryBar";
import NavigationBar from "../../components/NavigationBar";
import ViewUtils from "../../utils/ViewUtils";

const titles = ['最新评论', '热门评论'];
const controllers = [
    {categoryId: 1, controller: NewCommentList},
    {categoryId: 2, controller: HotCommentList},
]

/**
 * @Description 评论
 * @Author lucio
 * @Email lucio0314@163.com
 * @Date 07/06/2017 09:49
 * @Version 1.0.0
 */
export default class Comment extends Component {

    render() {
        //必须接受上个页面传递过来的props中的navigator,再传递到下个页面才能关联起来
        const {navigator} = this.props;
        return (
            <View style={{flex: 1}}>
                {this._navigationBar()}
                <ScrollableTabView
                    renderTabBar={() => <FeedsCategoryBar tabNames={titles}/>}
                    tabBarPosition='top'
                    scrollWithoutAnimation={false}>
                    {
                        controllers.map((data, index) => {
                                let Component = data.controller;
                                return (
                                    <Component
                                        key={titles[index]}
                                        tabLabel={titles[index]}
                                        navigator={navigator}   //非常重要:undefined is not an object (evaluating this.props.navigator.push).
                                        categoryId={data.categoryId}/>
                                )
                            }
                        )}
                </ScrollableTabView>
            </View>
        )
    }

    //导航栏标题
    _navigationBar() {
        return (
            <NavigationBar
                title='评论'
                leftButton={ViewUtils.getLeftButton(() => this._onBack())}
                style={{backgroundColor: 'orange'}}
                rightButton={{
                    title: '1295条',
                    tintColor: '#2E8FDB',
                }}/>
        )
    };

    _onBack = () => {
        const {navigator, onResetBarStyle} = this.props;
        onResetBarStyle && onResetBarStyle();
        navigator.pop()
    };
}
