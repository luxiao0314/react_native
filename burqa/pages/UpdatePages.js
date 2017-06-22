/**
 * Created by luthor on 09/06/2017.
 */
import React, {Component} from 'react'
import {
    StyleSheet, AppRegistry,
    View, NativeModules,
    Text, Image, TouchableOpacity, RefreshControl,
} from 'react-native';
import GridView from "../components/GridView";
import NavigationBar from "../components/NavigationBar";
import ViewUtils from "../utils/ViewUtils";
import UpdatePageStore from "../store/UpdatePageStore";
import {observer} from 'mobx-react/native'
import Loading from "../components/Loading";
import LoadMoreFooter from "../components/LoadMoreFooter";

/**
 * @Description 更新页面
 * @Author lucio
 * @Email lucio0314@163.com
 * @Date 09/06/2017 14:24
 * @Version 1.0.0
 */
@observer  //必须有observer,类似于全局接受observable观察者的变化,只要observable变化,这边取得值就可以接受到
export default class UpdatePages extends Component {

    constructor() {
        super();
        this.updatePageStore = new UpdatePageStore();
    }

    componentDidMount() {
        this.updatePageStore.fetchUpdatePageList();
    }

    componentWillMount() {
        const {errorMsg} = this.updatePageStore;
        // errorMsg && this.toast.show(errorMsg)
        errorMsg && alert(errorMsg)
    }

    render() {
        const {isFetching, updateList, isRefreshing} = this.updatePageStore;
        return (
            <View style={{flex: 1}}>
                {/*{this._navigationBar()}*/}
                <GridView
                    style={styles.gridViewStyle}
                    items={Array.from(updateList)}
                    itemsPerRow={3}
                    renderItem={this._renderImageItem}
                    //加载更多脚布局
                    renderFooter={this._renderFooter}
                    enableEmptySections={true}
                    onEndReached={this._onEndReach}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={this._onRefresh}
                            colors={['rgb(217, 51, 58)']}/>
                    }
                />
            </View>
        )
    }

    //当滑动到底部结束的时候页面叠加
    _onEndReach = () => {
        this.updatePageStore.page++;
        this.updatePageStore.fetchUpdatePageList();
    };

    _renderFooter = () => <LoadMoreFooter isRefresh={this.updatePageStore.isRefreshing}
                                          isNoMore={this.updatePageStore.isNoMore}/>;

    _onRefresh = () => {
        this.updatePageStore.isRefreshing = true;
        this.updatePageStore.fetchUpdatePageList();
    };

    _renderImageItem = (rowData) => {
        return (
            <TouchableOpacity onPress={() => this._onPress(rowData)}>
                <View style={styles.gridItemStyle} key={rowData.cover}>
                    <Image key={rowData} source={{uri: rowData.cover}} style={styles.imageStyle}
                           defaultSource={require('../res/images/define_empty.png')}/>
                    <View style={styles.chapterNameStyle}>
                        <Text
                            style={{color: 'white', margin: 3, fontSize: 12}}
                            numberOfLines={1}>{rowData.last_update_chapter_name}</Text>
                    </View>
                    <Text style={styles.titleStyle} numberOfLines={1}>{rowData.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    /**
     * 跳转到activity页面
     * @private
     * @param rowData
     */
    _onPress = (rowData) => {
        NativeModules.JsAndroid.jumpToActivity("lux://comicDes?obj_id=" + rowData.id);
    };
}

const styles = StyleSheet.create({
    gridViewStyle: {
        padding: 5
    },
    gridItemStyle: {
        width: (gScreen.width - 40) / 3,
        height: 180,
        margin: 5
    },
    imageStyle: {
        borderRadius: 5,
        height: gDimensions.imageHeight,
        borderWidth: 0.5,
    },
    chapterNameStyle: {
        width: (gScreen.width - 40) / 3,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: '#44B8B8B8',
        position: 'absolute',
        bottom: 30,
    },
    titleStyle: {
        position: 'absolute',
        left: 0,
        padding: 2,
        bottom: 0,
    }
});
AppRegistry.registerComponent('UpdatePages', () => UpdatePages);
