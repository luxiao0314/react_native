/**
 * Created by luthor on 07/06/2017.
 */
import React, {Component} from 'react'
import {
    Animated,
    StyleSheet,
    View,
    Text,
    NativeModules,
    AppRegistry, ListView, RefreshControl, Image, TouchableOpacity
} from 'react-native'

import {observer} from 'mobx-react/native'
import {reaction} from 'mobx'
import CommentStore from "../../store/CommentStore";
import LoadMoreFooter from "../../components/LoadMoreFooter";
import {Actions} from 'react-native-router-flux';
import * as HTTPTools from "../../utils/TimeUtil";

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
        this.getNativeData();
    }

    componentWillMount() {
        const {errorMsg} = this.commentStore;
        errorMsg && alert(errorMsg);
    }

    componentDidMount() {
        if(this.props.id !== undefined){
            this.commentStore.id = this.props.id;
            this.commentStore.fetchCommentList(0);
        }
    }

    getNativeData() {
        NativeModules.JsAndroid.jumpToJs(
            (id) => {
                this.commentStore.id = id;
                this.commentStore.fetchCommentList(0);
            },
            (erroMsg) => {
                alert(erroMsg)
            }
        );
    }

    render() {
        const {isRefreshing, commentList} = this.commentStore;
        return (
            <View style={styles.listView}>
                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(commentList.slice(0))}
                    //item布局
                    renderRow={this._renderRow}
                    //加载更多脚布局
                    renderFooter={this._renderFooter}
                    enableEmptySections={true}
                    initialListSize={3}
                    //滑动监听
                    // onScroll={this._onScroll}
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
            </View>
        )
    }

    _renderRow = (data) => {
        return (
            <TouchableOpacity onPress={() => Actions.commentDetails({"data": data})}>
                <View style={{padding: 10}}>
                    <View style={styles.topStyle}>
                        {/*头像*/}
                        <Image
                            style={{borderRadius: 15, borderColor: '#949a9f', borderWidth: 0.5, height: 30, width: 30}}
                            source={{uri: data.avatar_url}}
                            onLoadEnd={this._onLoadEnd}
                            defaultSource={require('../../res/images/default_avatar.png')}
                        />
                        {/*用户名*/}
                        <Text style={{color: '#2E8FDB', marginLeft: 10}}>
                            {data.nickname}
                        </Text>
                    </View>

                    {/*评论*/}
                    <Text style={{marginLeft: 40, marginTop: 5, marginBottom: 5, color: '#010101'}}>
                        {data.content}
                    </Text>

                    <View style={styles.buttonStyle}>
                        {/*时间*/}
                        <Text style={{
                            alignSelf: 'flex-start',
                            color: '#949a9f',
                            fontSize: 12
                        }}>{HTTPTools.dateForm1}</Text>
                        {/*点赞*/}
                        <View style={{position: 'absolute', right: 140, flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={require('../../res/images/ic_drawer_night_mode.png')}
                                   style={{width: 20, height: 20}}/>
                            <Text>点赞 {data.isused}</Text>
                        </View>
                        {/*回复*/}
                        <View style={{position: 'absolute', right: 80, flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={require('../../res/images/ic_drawer_comment.png')}
                                   style={{width: 20, height: 20}}/>
                            <Text onPress={() => Actions.animeNewsPages()}>回复</Text>
                        </View>
                    </View>

                    <View style={{borderBottomWidth: 0.5, marginLeft: 40, marginRight: 10, borderColor: '#949a9f'}}/>
                </View>
            </TouchableOpacity>
        );
    };

    _onLoadEnd = () => {
        // alert("失败")
    };

    _renderFooter = () => <LoadMoreFooter isRefresh={this.commentStore.isRefreshing}
                                          isNoMore={this.commentStore.isNoMore}/>;

    _onScroll = () => {

    };

    //当滑动到底部结束的时候页面叠加
    _onEndReach = () => {
        this.commentStore.page++;
        this.commentStore.fetchCommentList(0);
    };

    _onRefresh = () => {
        this.commentStore.isRefreshing = true;
        this.commentStore.fetchCommentList(0);
    };

}

const styles = StyleSheet.create({
    listView: {
        flex: 1,
        backgroundColor: gColors.background
    },
    topStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
    },
    buttonStyle: {
        width: gScreen.width,
        marginBottom: 5,
        marginLeft: 40,
        flexDirection: 'row',
        alignItems: 'center',
    }
});
