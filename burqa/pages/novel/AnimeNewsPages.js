/**
 * Created by lucio on 10/06/2017.
 */

import React, {Component} from 'react'
import {
    StyleSheet,
    View, AppRegistry, Dimensions, NativeModules,
    Text, Image, ScrollView, TouchableOpacity,
} from 'react-native';
import NavigationBar from "../../components/NavigationBar";
import ViewUtils from "../../utils/ViewUtils";
import AnimeNewsStore from "../../store/AnimeNewsStore";
import {observer} from 'mobx-react/native'
import ViewPager from "../../components/viewpager/ViewPager";
import NovelItemView from "../../components/NovelItemView";
import FindNovelPage from "./FindNovelPage";
import Loading from "../../components/Loading";
const width = Dimensions.get('window').width;
import Swiper from 'react-native-swiper';
import {Actions} from 'react-native-router-flux';
const data = [Object, Object, Object, Object, Object];


/**
 * @Description 轻小说页面
 * @Author lucio
 * @Email lucio0314@163.com
 * @Date 10/06/2017 12:49 PM
 * @Version 12:49 PM
 */
@observer
export default class AnimeNewsPages extends Component {


    constructor() {
        super();
        this.animeNewsStore = new AnimeNewsStore();
    }

    componentDidMount() {
        this.animeNewsStore.fetchData();
    }

    componentWillMount() {
        const {errorMsg} = this.animeNewsStore;
        errorMsg && alert(errorMsg)
    }

    render() {
        const {isFetching, dataArr} = this.animeNewsStore;
        return (
            <View style={{flex: 1}}>
                {/*{this._navigationBar()}*/}
                <ScrollView style={{backgroundColor: gColors.background}} removeClippedSubviews={false}>
                    {this._bannerView()}
                    {this._secondView()}
                    {this._recentUpdatesView(dataArr)}
                    <Loading isShow={isFetching}/>
                </ScrollView>
            </View>
        );
    }


    _renderPage() {
        const {banner} = this.animeNewsStore;
        //不知道为什么必须要把数组再封装图片才显示
        banner.map((itemData, i) => {
            data[i] = itemData;
        });

        const dataArr = [];
        data.map((itemData,index) => {
            dataArr.push(
                <TouchableOpacity key={index} onPress={()=>Actions.novelDesPage({"title": itemData.title,"obj_id":itemData.obj_id})}>
                    <Image style={{width: gScreen.width, height: 220}}
                           source={{uri: itemData.cover}}
                           defaultSource={require('../../res/images/define_empty.png')}>
                        <Text style={styles.bannerTextStyle}>{itemData.title}</Text>
                    </Image>
                </TouchableOpacity>
            )
        });
        return dataArr;
    };

    _bannerView() {
        return (
            <Swiper
                style={styles.wrapper}
                height={220}
                autoplay={true}
                paginationStyle={{bottom: 10, justifyContent: 'flex-end'}}
                dot={<View style={styles.dot_default}/>}
                activeDot={<View style={styles.dot_select}/>}>
                {this._renderPage()}
            </Swiper>
        )
    }

    _secondView() {
        return (
            <View style={styles.secondStyle}>
                <TouchableOpacity onPress={this._afterNovel} style={{flex: 1, alignItems: 'center'}}>
                    <Image source={require('../../res/images/img_novel_title_book.png')}
                           style={{height: 50, width: 50}}/>
                    <Text style={{marginTop: 5}}>追小说</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._findNovel} style={{flex: 1, alignItems: 'center'}}>
                    <Image source={require('../../res/images/img_novel_title_dian.png')}
                           style={{height: 50, width: 50}}/>
                    <Text style={{marginTop: 5}}>找小说</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._listNovel} style={{flex: 1, alignItems: 'center'}}>
                    <Image source={require('../../res/images/img_novel_title_chart.png')}
                           style={{height: 50, width: 50}}/>
                    <Text style={{marginTop: 5}}>排行榜</Text>
                </TouchableOpacity>
            </View>
        )
    }

    /**
     * 最新更新
     * @param dataArr
     * @private
     */
    _recentUpdatesView(dataArr) {
        const itemArr = [];
        dataArr.map((itemData, index) => {
            if (index !== 0) {
                itemArr.push(
                    <NovelItemView
                        key={index}
                        data={itemData}
                        title={itemData.title}
                    />
                )
            }
        });
        return itemArr;
    }

    /**
     * 追小说
     * @private
     */
    _afterNovel = () => {
        // alert('追小说')
        Actions.latestNovelPage();
    };

    /**
     * 找小说
     * @private
     */
    _findNovel = () => {
        // NativeModules.JsAndroid.jumpToActivity("lux://FindNovelPage");
        Actions.findNovelPage();
    };

    /**
     * 排行榜
     * @private
     */
    _listNovel = () => {
        Actions.novelListPage();
    }
}

const styles = StyleSheet.create({
    bannerTextStyle: {
        backgroundColor: '#44B8B8B8',
        width: width,
        position: 'absolute',
        bottom: 0,
        padding: 5
    },
    secondStyle: {
        padding: 10,
        flexDirection: 'row',
        backgroundColor: 'white',
        marginBottom: 10
    },
    dot_default: {
        width: 8,
        height: 8,
        backgroundColor: 'white',
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3
    },
    dot_select: {
        width: 8,
        height: 8,
        backgroundColor: 'orange',
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3
    }
});
AppRegistry.registerComponent('AnimeNewsPages', () => AnimeNewsPages);