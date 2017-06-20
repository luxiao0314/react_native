/**
 * Created by lucio on 19/06/2017.
 */
import React, {Component} from 'react'
import {
    View, StyleSheet,
    Text, RefreshControl, TouchableOpacity, Image
} from 'react-native'
import Router from "react-native-router-flux/src/Router";
import Scene from "react-native-router-flux/src/Scene";
import FindNovelSubPageStore from "../../store/FindNovelSubPageStore";
import GridView from "../../components/GridView";
import LoadMoreFooter from "../../components/LoadMoreFooter";
import {observer} from 'mobx-react/native'
import TextView from "../../components/TextView";
/**
 * @Description 小说分类列表
 * @Author lucio
 * @Email lucio0314@163.com
 * @Date 20/06/2017 16:11
 * @Version 1.0.2
 */
@observer
export default class FindNovelSubPage extends Component {

    constructor() {
        super();
        this.findNovelSubPageStore = new FindNovelSubPageStore();
    }

    componentDidMount() {
        this.findNovelSubPageStore.tag_id = this.props.tag_id;
        this.findNovelSubPageStore.getData();
    }

    componentWillMount() {
        const {errorMsg} = this.findNovelSubPageStore;
        errorMsg && alert(errorMsg)
    }

    render() {
        const {updateList, isRefreshing} = this.findNovelSubPageStore;
        return (
            <View style={{flex: 1}}>
                {this._tabView()}
                {this._content(updateList, isRefreshing)}
            </View>
        )
    }

    //当滑动到底部结束的时候页面叠加
    _onEndReach = () => {
        this.findNovelSubPageStore.page++;
        this.findNovelSubPageStore.getData();
    };

    _renderFooter = () => <LoadMoreFooter isRefresh={this.findNovelSubPageStore.isRefreshing}
                                          isNoMore={this.findNovelSubPageStore.isNoMore}/>;

    _onRefresh = () => {
        this.findNovelSubPageStore.isRefreshing = true;
        this.findNovelSubPageStore.getData();
    };

    _renderImageItem = (rowData) => {
        return (
            <TouchableOpacity onPress={() => this._onPress(rowData)}>
                <View style={styles.gridItemStyle} key={rowData.cover}>
                    <Image key={rowData} source={{uri: rowData.cover}} style={styles.imageStyle}
                           defaultSource={require('../../res/images/define_empty.png')}/>
                    <View style={styles.chapterNameStyle}>
                        <Text
                            style={{color: 'white', margin: 3, fontSize: 12}}
                            numberOfLines={1}>{rowData.name}</Text>
                    </View>
                    <Text style={styles.titleStyle} numberOfLines={1}>{rowData.authors}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    /**
     * 跳转到activity页面
     * @private
     * @param rowData
     */
    _onPress = (rowData) => {
        alert(rowData.name)
    };

    _tabView() {
        return (
            <View style={{flexDirection: 'row', width: gScreen.width, backgroundColor: "#44B8B8B8"}}>
                <TouchableOpacity onPress={() => alert("搞笑")}>
                    <TextView
                        drawRight={require('../../res/images/img_triangle_down_gray.png')}
                        text='搞笑'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => alert("连载进度")}>
                    <TextView
                        drawRight={require('../../res/images/img_triangle_down_gray.png')}
                        text='连载进度'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => alert("连载进度")}>
                    <TextView
                        drawRight={require('../../res/images/img_down_gray.png')}
                        text='人气'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => alert("更新")}>
                    <TextView
                        style={{position: 'absolute', right: 80}}
                        drawRight={require('../../res/images/img_down_gray.png')}
                        text='更新'/>
                </TouchableOpacity>
            </View>
        )
    }

    _content(updateList, isRefreshing) {
        return (
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
        )
    }
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
        height: 150,
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