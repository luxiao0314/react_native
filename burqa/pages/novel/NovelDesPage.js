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
    Text, Image, RefreshControl, ListView, TouchableOpacity
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {observer} from 'mobx-react/native'
import NovelDesStore from "../../store/NovelDesStore";
import NovelHeaderView from "../../components/NovelHeaderView";
import GridView from "../../components/GridView";

/**
 * @Description 小说详情页面
 * @Author lucio
 * @Email lucio0314@163.com
 * @Date 22/06/2017 09:47
 * @Version 1.0.1
 */
@observer
export default class NovelDesPage extends Component {

    constructor() {
        super();
        this.novelDesStore = new NovelDesStore();
        this.novelDesStore.isRefreshing = true;
    }

    state = {
        dataSource: new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        })
    };

    componentDidMount() {
        this.novelDesStore.obj_id = this.props.obj_id;
        this.novelDesStore.fetchData();
        Actions.refresh({
            title: this.props.title
        });
    }

    componentWillMount() {
        const {errorMsg} = this.novelDesStore;
        errorMsg && alert(errorMsg)
    }

    render() {
        const {volume, isRefreshing} = this.novelDesStore;
        return (
            <View style={styles.listView}>
                <GridView
                    items={volume.slice(0)}
                    //header
                    renderHeader={this._renderHeader}
                    //item布局
                    renderItem={this._renderRow}
                    itemsPerRow={2}
                    enableEmptySections={true}
                    initialListSize={3}
                    onEndReachedThreshold={30}
                    //刷新控制器
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={this._onRefresh}
                            colors={['rgb(217, 51, 58)']}/>
                    }>
                </GridView>
            </View>
        )
    }

    //头布局
    _renderHeader = () => {
        return (
            <NovelHeaderView
                types={this.novelDesStore.types}
                hot_hits={this.novelDesStore.hot_hits}
                cover={this.novelDesStore.cover}
                name={this.novelDesStore.name}
                subscribe_num={this.novelDesStore.subscribe_num}
                newChapter={this.novelDesStore.newChapter}
                introduction={this.novelDesStore.introduction}
                last_update_time={this.novelDesStore.last_update_time}/>
        )
    };

    //item
    _renderRow = (rowData) => {
        let volume_name = rowData.volume_name;
        let volumeName = volume_name.substring(0, volume_name.length - 1);
        return (
            <TouchableOpacity style={styles.itemStyle} onPress={() => alert(rowData.volume_name)}>
                <Image source={require('../../res/images/img_share_copy_link.png')}
                       style={{padding: 5, height: 20, width: 20}}/>
                <Text style={{marginLeft: 5}} numberOfLines={1}>{volumeName}</Text>
            </TouchableOpacity>
        )
    };

    _onRefresh = () => {
        this.novelDesStore.isRefreshing = true;
        this.novelDesStore.fetchData();
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
    },
    itemStyle: {
        width: gScreen.width / 2,
        flexDirection: 'row',
        height: 40,
        backgroundColor: 'white',
        marginTop: 1,
        alignItems: 'center',
        padding: 5
    },
    infoBarStyle: {
        marginTop: 10,
        padding: 16,
        width: gScreen.width,
        alignItems: 'center',
        backgroundColor: 'white'
    }
});