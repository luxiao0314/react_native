/**
 * Created by luthor on 23/06/2017.
 */
import React, {Component} from 'react'
import {
    View, AppRegistry,
    Text, Image, ListView, RefreshControl, TouchableOpacity
} from 'react-native'
import RefreshListView from "../../components/RefreshListView";
import LatestNovelStore from "../../store/LatestNovelStore";
import CommStyle from "../../res/styles/CommStyle";
import {observer} from 'mobx-react/native'
import {Actions} from 'react-native-router-flux';

@observer
export default class LatestNovelPage extends Component {

    constructor() {
        super();
        this.latestNovelStore = new LatestNovelStore();
        this.latestNovelStore.isRefreshing = true;
    }

    //视图加载完成请求网络
    componentDidMount() {
        this.latestNovelStore.fetchData();
    }

    componentWillMount() {
        const {errorMsg} = this.latestNovelStore;
        errorMsg && alert(errorMsg)
    }

    render() {
        const {dataList, isRefreshing, isNoMore} = this.latestNovelStore;
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

    _renderRow = (rowData) => {
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
        return (
            <TouchableOpacity style={newVar} onPress={()=>Actions.novelDesPage({"title": rowData.name,"obj_id":rowData.id})}>
                <Image source={{uri: rowData.cover}} style={CommStyle.styles.imageStyle}/>
                <View style={{width: 150,marginLeft:5}}>
                    <Text style={{margin: 10, fontSize: 18, fontWeight: ('bold', '700')}}
                          numberOfLines={1}>{rowData.name}</Text>
                    <Text style={{margin: 10}}>{rowData.authors}</Text>
                    <Text style={{margin: 10}}>{type}</Text>
                    <Text style={{margin: 10}}>{rowData.last_update_time}</Text>
                </View>
                <View style={{right: 10, position: 'absolute', width: 60, alignItems: 'center'}}>
                    <Image source={require('../../res/images/img_novel_title_book.png')}
                           style={{height: 40, width: 40, alignItems: 'center'}}/>
                    <Text style={{marginTop: 10, alignItems: 'center'}}
                          numberOfLines={1}>{rowData.last_update_chapter_name}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    //当滑动到底部结束的时候页面叠加
    _onEndReach = () => {
        this.latestNovelStore.page++;
        this.latestNovelStore.fetchData();
    };

    _onRefresh = () => {
        this.latestNovelStore.isRefreshing = true;
        this.latestNovelStore.fetchData();
    };
}

