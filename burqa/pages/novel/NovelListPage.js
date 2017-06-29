/**
 * Created by luthor on 23/06/2017.
 */
import React, {Component} from 'react'
import {
    View, AppRegistry,
    Text, Image, ListView, RefreshControl, TouchableOpacity
} from 'react-native'
import RefreshListView from "../../components/RefreshListView";
import CommStyle from "../../res/styles/CommStyle";
import {observer} from 'mobx-react/native'
import {Actions} from 'react-native-router-flux';
import NovelListStore from "../../store/NovelListStore";
import {observable} from "../../../../node_modules/mobx/lib/mobx";
import NovelListRouter from "../../router/NovelListRouter";

@observer
export default class NovelListPage extends Component {

    @observable requireImage = require('../../res/images/img_rank_1.png');

    constructor() {
        super();
        this.novelListStore = new NovelListStore();
        this.novelListStore.isRefreshing = true;
    }

    //视图加载完成请求网络
    componentDidMount() {
        Actions.refresh({
            leftButtonImage: require('../../res/images/ic_arrow_back_white.png'),
            onLeft: () => {
                // NativeModules.JsAndroid.backToNative();
            },
            rightTitle: 'search',
            onRight: () => {
                // NativeModules.JsAndroid.jumpToActivity("lux://search?needLogin");
            }
        });
        this.novelListStore.fetchData();
    }

    componentWillMount() {
        const {errorMsg} = this.novelListStore;
        errorMsg && alert(errorMsg)
    }

    render() {
        const {dataList, isRefreshing, isNoMore} = this.novelListStore;
        return (
            <View style={{flex: 1, backgroundColor: gColors.background}}>
                <RefreshListView
                    rowData={Array.from(dataList)}
                    isRefreshing={isRefreshing}
                    isNoMore={isNoMore}
                    _renderRow={this._renderRow}
                    _onEndReach={this._onEndReach}
                    _onRefresh={this._onRefresh}
                />
            </View>
        )
    }

    _renderRow = (rowData, sectionId, rowId) => {
        if (rowId === "0") {
            this.requireImage = require('../../res/images/img_rank_1.png');
        } else if (rowId === "1") {
            this.requireImage = require('../../res/images/img_rank_2.png');
        } else if (rowId === "2") {
            this.requireImage = require('../../res/images/img_rank_3.png');
        } else {
            this.requireImage = require('../../res/images/img_rank_4.png');
        }

        let type = '';
        rowData.types.map((item) => {
            type += item;
        });
        let newVar = {
            width: gScreen.width,
            flexDirection: 'row',
            backgroundColor: 'white',
            padding: 10,
            marginBottom: 1,
            alignItems: 'center'
        };
        let imageStyle = {
            position: 'absolute',
            right: 0,
            top: 0,
            height: 40,
            width: 40,
            alignItems: 'center'
        };
        return (
            <TouchableOpacity style={newVar}
                              onPress={() => Actions.novelDesPage({"title": rowData.name, "obj_id": rowData.id})}>
                <Image source={{uri: rowData.cover}} style={CommStyle.styles.imageStyle}/>
                <View style={{width: 150, marginLeft: 5}}>
                    <Text style={{margin: 10, fontSize: 18, fontWeight: ('bold', '700')}}
                          numberOfLines={1}>{rowData.name}</Text>
                    <Text style={{margin: 10}} numberOfLines={1}>{rowData.authors}</Text>
                    <Text style={{margin: 10}} numberOfLines={1}>{type}</Text>
                    <Text style={{margin: 10}} numberOfLines={1}>{rowData.last_update_time}</Text>
                </View>
                <Image source={this.requireImage} style={imageStyle}>
                    <Text style={{position: 'absolute', right: 5, top: 5, backgroundColor: '#00000000'}}>{rowId}</Text>
                </Image>
            </TouchableOpacity>
        )
    };

    //当滑动到底部结束的时候页面叠加
    _onEndReach = () => {
        this.novelListStore.page++;
        this.novelListStore.fetchData();
    };

    _onRefresh = () => {
        this.novelListStore.isRefreshing = true;
        this.novelListStore.fetchData();
    };
}

AppRegistry.registerComponent('NovelListPage', () => NovelListRouter);