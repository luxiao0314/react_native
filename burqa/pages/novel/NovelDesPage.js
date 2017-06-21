/**
 * @Description 小说详情页面
 * @Author lucio
 * @Email lucio0314@163.com
 * @Date 21/06/2017$
 * @Version 1.0.1
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text, Image, RefreshControl, ListView
} from 'react-native';
import {Actions} from 'react-native-router-flux';

export default class NovelDesPage extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        Actions.refresh({
            title: this.props.title
        });
    }

    render() {
        return (
            <View style={styles.listView}>
                {/*<ListView*/}
                    {/*dataSource={this.state.dataSource.cloneWithRows(commentList.slice(0))}*/}
                    {/*//item布局*/}
                    {/*renderRow={this._renderRow}*/}
                    {/*//加载更多脚布局*/}
                    {/*enableEmptySections={true}*/}
                    {/*initialListSize={3}*/}
                    {/*onEndReachedThreshold={30}*/}
                    {/*//刷新控制器*/}
                    {/*refreshControl={*/}
                        {/*<RefreshControl*/}
                            {/*refreshing={isRefreshing}*/}
                            {/*onRefresh={this._onRefresh}*/}
                            {/*colors={['rgb(217, 51, 58)']}/>*/}
                    {/*}>*/}
                {/*</ListView>*/}
            </View>
        )
    }
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