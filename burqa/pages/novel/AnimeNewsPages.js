/**
 * Created by lucio on 10/06/2017.
 */

import React, {Component} from 'react'
import {
    StyleSheet,
    View,AppRegistry,Dimensions,NativeModules,
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
/**
 * @Description
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

    state = {
        dataSource: new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2,
        }),
    };

    componentDidMount() {
        this.animeNewsStore.fetchData();
    }

    componentWillMount() {
        const {errorMsg} = this.animeNewsStore;
        errorMsg && alert(errorMsg)
    }

    render() {
        const {isFetching, banner, dataArr} = this.animeNewsStore;
        return (
            <View style={{flex: 1}}>
                {/*{this._navigationBar()}*/}
                <ScrollView style={{backgroundColor: '#f5f5f5'}}>
                    {this._bannerView(banner)}
                    {this._secondView()}
                    {this._recentUpdatesView(dataArr)}
                    <Loading isShow={isFetching}/>
                </ScrollView>
            </View>
        );
    }

    _renderPage = (banner) => {
        return (
            <View>
                {/*图片一定要设置宽高,否则显示不出来*/}
                <Image style={{width: gScreen.width, height: 180}}
                       source={{uri: banner.cover}}
                       defaultSource={require('../../res/images/define_empty.png')}
                />
                <Text style={styles.bannerTextStyle}>{banner.title}</Text>
            </View>
        )
    };

    //导航栏标题
    _navigationBar() {
        return (
            <NavigationBar
                title='轻小说'
                leftButton={ViewUtils.getLeftButton(() => this._onBack())}
                style={{backgroundColor: 'orange'}}/>
        )
    };

    _onBack = () => {
        const {navigator, onResetBarStyle} = this.props;
        onResetBarStyle && onResetBarStyle();
        navigator.pop()
    };

    _bannerView(banner) {
        return (
            <View style={{height: 180, backgroundColor: '#F5FCFF'}}>
                <ViewPager
                    dataSource={this.state.dataSource.cloneWithPages(banner.slice())}
                    renderPage={this._renderPage}
                    isLoop={true}
                    autoPlay={true}/>
            </View>
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
        alert('追小说')
    }

    /**
     * 找小说
     * @private
     */
    _findNovel = () => {
        NativeModules.JsAndroid.jumpToActivity("lux://FindNovelPage");
    };

    /**
     * 排行榜
     * @private
     */
    _listNovel = () => {
        alert('排行榜')
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
    }
});

AppRegistry.registerComponent('AnimeNewsPages', () => AnimeNewsPages);