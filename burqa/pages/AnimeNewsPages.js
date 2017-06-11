/**
 * Created by lucio on 10/06/2017.
 */

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text, Image, ScrollView,
} from 'react-native';
import NavigationBar from "../components/NavigationBar";
import ViewUtils from "../utils/ViewUtils";
import AnimeNewsStore from "../store/AnimeNewsStore";
import {observer} from 'mobx-react/native'
import Loading from "../../../src/components/Loading";
import CusViewPageIndicator from "../components/viewpager/DefaultViewPageIndicator";
import ViewPager from "../components/viewpager/ViewPager";
import NovelItemView from "../components/NovelItemView";

var IMGS = [
    'https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=1024',
    'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?h=1024',
    'https://images.unsplash.com/photo-1441448770220-76743f9e6af6?h=1024',
    'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?h=1024',
    'https://images.unsplash.com/photo-1441126270775-739547c8680c?h=1024'
];

/**
 * @Description 动漫资讯
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
        if (banner.length !== 0) {
            IMGS.map((url, key) => {
                banner[key].cover = url;   //更换请求url为静态url
            });
        }
        return (
            <View style={{flex: 1}}>
                {this._navigationBar()}
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
                <Image style={{width: gScreen.width, height: 150}}
                       source={{uri: banner.cover}}
                       resizeMode='repeat'
                       defaultSource={require('../res/images/define_empty.png')}
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
            <View style={{height: 150, backgroundColor: '#F5FCFF'}}>
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
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Image source={require('../res/images/img_novel_title_book.png')}
                           style={{height: 50, width: 50}}/>
                    <Text style={{marginTop: 5}}>追小说</Text>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Image source={require('../res/images/img_novel_title_dian.png')}
                           style={{height: 50, width: 50}}/>
                    <Text style={{marginTop: 5}}>找小说</Text>
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <Image source={require('../res/images/img_novel_title_chart.png')}
                           style={{height: 50, width: 50}}/>
                    <Text style={{marginTop: 5}}>排行榜</Text>
                </View>
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
}

const styles = StyleSheet.create({
    bannerTextStyle: {
        backgroundColor: '#44B8B8B8',
        width: gScreen.width,
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
