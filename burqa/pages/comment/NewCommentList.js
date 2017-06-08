/**
 * Created by luthor on 07/06/2017.
 */
import React, {Component} from 'react'
import {
    Animated,
    StyleSheet,
    View,
    Text,
    AppRegistry, ListView, RefreshControl, Image, TouchableOpacity
} from 'react-native'

import {observer} from 'mobx-react/native'
import {reaction} from 'mobx'
import CommentStore from "../../store/CommentStore";
import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";
import LoadMoreFooter from "../../../../src/components/LoadMoreFooter";
import ViewUtils from "../../utils/ViewUtils";
import NavigationBar from "../../components/NavigationBar";
import CommentDetails from "./CommentDetails";

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
        this.commentStore.page;
        this.commentStore.id = 1;
        this.commentStore.fetchCommentList();
        // });
    }

    componentWillMount() {
        const {errorMsg} = this.commentStore;
        // errorMsg && this.toast.show(errorMsg)
        errorMsg && alert(errorMsg)
    }

    render() {
        const {isFetching, isRefreshing, commentList} = this.commentStore;
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
                <Loading isShow={isFetching}/>
                <Toast ref={toast => this.toast = toast}/>
            </View>
        )
    }

    _renderRow = data => {
        return (
            <TouchableOpacity onPress={this._onPress}>
                <View style={{padding: 10}}>
                    <View style={styles.topStyle}>
                        {/*头像*/}
                        <Image style={{borderRadius: 15, borderWidth: 0.5, height: 30, width: 30}}
                               source={{uri: data.avatar_url}}
                               onLoadEnd={this._onLoadEnd}
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
                        <Text style={{alignSelf: 'flex-start', color: '#949a9f', fontSize: 12}}>{data.createtime}</Text>
                        {/*点赞*/}
                        <Text style={{marginLeft: 50}}>点赞 {data.isused}</Text>
                        {/*回复*/}
                        <Text style={{textAlign: 'right', marginLeft: 20}}>回复</Text>
                    </View>

                    <View style={{borderBottomWidth: 1, marginLeft: 40, borderColor: '#949a9f'}}/>
                </View>
            </TouchableOpacity>
        );
    };

    _onLoadEnd = () => {
        // alert("失败")
    };

    _renderFooter = () => <LoadMoreFooter isNoMore={this.commentStore.isNoMore}/>;

    _onScroll = () => {

    };

    //当滑动到底部结束的时候页面叠加
    _onEndReach = () => this.commentStore.page++;

    _onRefresh = () => {
        this.commentStore.isRefreshing = true;
        this.commentStore.id = 2;
        this.commentStore.fetchCommentList();
    };

    /**
     * 上个页面,也就是comment.js中接受props中的navigator,这里才能正常调用
     * @private
     */
    _onPress = () => {
        this.props.navigator.push({
            component: <CommentDetails/> 
        })
    };

}

const styles = StyleSheet.create({
    listView: {
        flex: 1,
        backgroundColor: '#f5f5f5'
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
