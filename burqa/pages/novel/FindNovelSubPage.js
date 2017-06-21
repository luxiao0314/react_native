/**
 * Created by lucio on 19/06/2017.
 */
import React, {Component} from 'react'
import {
    View, StyleSheet,
    Text, RefreshControl, TouchableOpacity, Image
} from 'react-native'
import FindNovelSubPageStore from "../../store/FindNovelSubPageStore";
import GridView from "../../components/GridView";
import LoadMoreFooter from "../../components/LoadMoreFooter";
import {observer} from 'mobx-react/native'
import TextView from "../../components/TextView";
import FilterDialog from "../../components/FilterDialog";
import {observable} from "../../../../node_modules/mobx/lib/mobx";
const PubSub = require('pubsub-js');
/**
 * @Description 小说分类列表
 * @Author lucio
 * @Email lucio0314@163.com
 * @Date 20/06/2017 16:11
 * @Version 1.0.2
 */
@observer
export default class FindNovelSubPage extends Component {

    @observable dialogVisible = false;
    @observable type = 'funny';
    @observable tabTitle = '';

    constructor() {
        super();
        this.findNovelSubPageStore = new FindNovelSubPageStore();
        this.findNovelSubPageStore.isRefreshing = true;
        this._subscribe();
    }

    componentDidMount() {
        this.findNovelSubPageStore.tag_id = this.props.tag_id;
        this.tabTitle = this.props.tabTitle;
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
                <FilterDialog
                    type={this.type}
                    _dialogVisible={this.dialogVisible}/>
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
                <TouchableOpacity onPress={() => {
                    this.dialogVisible = true;
                    this.type = 'funny';
                    this.findNovelSubPageStore.type = '1'
                }}>
                    <TextView
                        drawRight={require('../../res/images/img_triangle_down_gray.png')}
                        text={this.tabTitle}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    this.dialogVisible = true;
                    this.type = 'progress';
                    this.findNovelSubPageStore.type = '2'
                }}>
                    <TextView
                        drawRight={require('../../res/images/img_triangle_down_gray.png')}
                        text='连载进度'/>
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

    _subscribe() {
        PubSub.subscribe("dialogVisible", (msg, data) => {
            this.dialogVisible = data;
        });
        //搞笑
        PubSub.subscribe("tag_id", (msg, filter_tag_id) => {
            this.dialogVisible = false;
            this.findNovelSubPageStore.tag_id = filter_tag_id;
            this.findNovelSubPageStore.isRefreshing = true;
            this.findNovelSubPageStore.page = 0;
            this.findNovelSubPageStore.getData();
        });
        //进度
        PubSub.subscribe("type", (msg, filter_tag_id) => {
            this.dialogVisible = false;
            this.findNovelSubPageStore.type = filter_tag_id;
            this.findNovelSubPageStore.isRefreshing = true;
            this.findNovelSubPageStore.page = 0;
            this.findNovelSubPageStore.getData();
        })
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