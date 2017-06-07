/**
 * Created by luthor on 07/06/2017.
 */
import React, {Component} from 'react'
import {
    Animated,
    StyleSheet,
    View,
    Text,
    AppRegistry, ListView, RefreshControl
} from 'react-native'

import {observer} from 'mobx-react/native'
import {reaction} from 'mobx'
import CommentStore from "../store/CommentStore";
import Toast from "react-native-easy-toast";

/**
 * @Description 评论列表
 * @Author lucio
 * @Email lucio0314@163.com
 * @Date 07/06/2017 09:49
 * @Version 1.0.0
 */
@observer
export default class NewCommentList extends Component {

    state = {
        dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        })
    };

    constructor() {
        super();
        this.commentStore = new CommentStore();
    }

    //视图加载完成请求网络
    componentDidMount() {
        // reaction(() => {
        this.commentStore.fetchCommentList(1);
        // });
    }

    componentWillMount() {
        const {errorMsg} = this.commentStore;
        // errorMsg && this.toast.show(errorMsg)
        errorMsg && alert(errorMsg)
    }

    render() {
        const {isRefreshing, commentList} = this.commentStore;
        return (
            <View style={styles.listView}>
                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(commentList.slice())}
                    //item布局
                    renderRow={this._renderRow}
                    //加载更多脚布局
                    renderFooter={this._renderFooter}
                    enableEmptySections
                    initialListSize={3}
                    //滑动监听
                    onScroll={this._onScroll}
                    //ListView在滚动到最后一个Cell的时候，会触发onEndReached方法，就是从这个方法入手
                    onEndReached={this._onEndReach}
                    onEndReachedThreshold={30}
                    //刷新控制器
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={this._onRefresh}
                            colors={['rgb(217, 51, 58)']}/>
                    }>
                </ListView>

                <Toast ref={toast => this.toast = toast}/>
            </View>
        )
    }

    _renderRow = feed => {

    };

    _renderFooter = () => {

    };

    _onScroll = () => {

    };

    _onEndReach = () => {

    };

    _onRefresh = () => {

    };

}

const styles = StyleSheet.create({
    listView: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    }
})
