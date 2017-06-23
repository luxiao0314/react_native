/**
 * Created by luthor on 23/06/2017.
 */
import React, {Component, PropTypes} from 'react'
import {
    View, StyleSheet,
    Text, Image, ListView, RefreshControl
} from 'react-native'
import LoadMoreFooter from "./LoadMoreFooter";

/**
 * @Description 下拉刷新和加载更多listView
 * @Author lucio
 * @Email lucio0314@163.com
 * @Date 23/06/2017 14:50
 * @Version 1.0.1
 */
export default class RefreshListView extends Component {

    static propTypes = {
        _renderRow: PropTypes.func,
        _onEndReach: PropTypes.func,
        _onRefresh: PropTypes.func,
        isRefreshing: PropTypes.bool,
        isNoMore: PropTypes.bool,
        rowData: PropTypes.array
    };

    state = {
        dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        })
    };


    render() {
        const {_renderRow, _onEndReach, _onRefresh, rowData, isRefreshing} = this.props;
        return (
            <ListView
                dataSource={this.state.dataSource.cloneWithRows(rowData.slice(0))}
                //item布局
                renderRow={_renderRow}
                //加载更多脚布局
                renderFooter={this._renderFooter}
                enableEmptySections={true}
                initialListSize={3}
                //ListView在滚动到最后一个Cell的时候，会触发onEndReached方法，就是从这个方法入手
                onEndReached={_onEndReach}
                onEndReachedThreshold={30}
                //刷新控制器
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={_onRefresh}
                        colors={['rgb(217, 51, 58)']}/>
                }>
            </ListView>
        )
    }

    _renderFooter = () => <LoadMoreFooter isRefresh={this.props.isRefreshing}
                                          isNoMore={this.props.isNoMore}/>;
}