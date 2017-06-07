/**
 * Created by luthor on 07/06/2017.
 */
import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import FeedsCategoryBar from "../../../../src/components/FeedsCategoryBar";
import NewCommentList from "./NewCommentList";
import HotCommentList from "./HotCommentList";
import ScrollableTabView from "react-native-scrollable-tab-view";

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
        return (
            <View style={{flex: 1}}>
                <ScrollableTabView
                    renderTabBar={() => <FeedsCategoryBar tabNames={titles}/>}
                    tabBarPosition='top'
                    scrollWithoutAnimation={false}
                >
                    {controllers.map((data, index) => {
                        let Component = data.controller;
                        return (
                            <Component
                                key={titles[index]}
                                tabLabel={titles[index]}
                                categoryId={data.categoryId}
                                // navigator={navigator}
                            />
                        )
                    })}
                </ScrollableTabView>
            </View>
        )
    }
}
