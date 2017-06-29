/**
 * Created by lucio on 11/06/2017.
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    View, AppRegistry,
    Text,
    Image, TouchableOpacity, RefreshControl
} from 'react-native'
import GridView from "../../components/GridView";
import FindNovelStore from "../../store/FindNovelStore";
import {observer} from 'mobx-react/native'
import {Actions} from 'react-native-router-flux';
import NovelRouter from "../../router/NovelRouter";
import FindNovelRouter from "../../router/FindNovelRouter";

/**
 * @Description 找小说页面
 * @Author lucio
 * @Email lucio0314@163.com
 * @Date 11/06/2017 1:36 PM
 * @Version 1:36 PM
 */
@observer
export default class FindNovelPage extends Component {

    constructor() {
        super();
        this.findNovelStore = new FindNovelStore();
    }

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
        this.findNovelStore.fetchData();
    }

    componentWillMount() {
        const {errorMsg} = this.findNovelStore;
        errorMsg && alert(errorMsg)
    }

    render() {
        const {dataArr, isRefreshing} = this.findNovelStore;
        return (
            <View>
                <GridView
                    style={{padding: 5}}
                    items={Array.from(dataArr)}
                    itemsPerRow={3}
                    renderItem={this._renderImageItem}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={this._onRefresh}
                            colors={['rgb(217, 51, 58)']}/>
                    }
                />
            </View>
        )
    };

    _onRefresh = () => {
        this.findNovelStore.isRefreshing = true;
        this.findNovelStore.fetchData();
    };

    _renderImageItem(rowData) {
        return (
            <TouchableOpacity onPress={() => {
                Actions.findNovelSubPage({"tag_id": rowData.tag_id, "tabTitle": rowData.title});
            }}>
                <View style={styles.gridItemStyle} key={rowData.cover}>
                    <Image style={styles.imageStyle}
                           source={{uri: rowData.cover}}
                           resizeMode='contain'
                           defaultSource={require('../../res/images/define_empty.png')}/>
                    <Text style={styles.titleStyle} numberOfLines={1}>{rowData.title}</Text>
                </View>
            </TouchableOpacity>
        )
    };
}

const styles = StyleSheet.create({
    imageStyle: {
        borderRadius: 5,
        borderWidth: 0.5,
        height: (gScreen.width - 40) / 3,
        width: (gScreen.width - 40) / 3,
    },
    titleStyle: {
        position: 'absolute',
        left: 0,
        margin: 2,
        bottom: 0,
    },
    gridItemStyle: {
        width: (gScreen.width - 40) / 3,
        height: (gScreen.width - 40) / 3 + 20,
        margin: 5
    },
});

AppRegistry.registerComponent('FindNovelPage', () => FindNovelRouter);
