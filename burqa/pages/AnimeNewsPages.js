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

var IMGS = [
    'https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=1024',
    'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?h=1024',
    'https://images.unsplash.com/photo-1441448770220-76743f9e6af6?h=1024',
    'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?h=1024',
    'https://images.unsplash.com/photo-1441126270775-739547c8680c?h=1024',
    'https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?h=1024',
    'https://images.unsplash.com/photo-1440847899694-90043f91c7f9?h=1024'
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
        const {isFetching, banner, recentUpdates, animationDuring, toAnimate, classicWillSee} = this.animeNewsStore;
        return (
            <View style={{flex: 1}}>
                {this._navigationBar()}
                <ScrollView>
                    <View style={{height: 150, color: '#f5f5f5'}}>
                        <ViewPager
                            dataSource={this.state.dataSource.cloneWithPages(banner.slice())}
                            renderPage={this._renderPage}
                            isLoop={true}
                            autoPlay={true}/>
                    </View>
                    <Loading isShow={isFetching}/>
                </ScrollView>
            </View>
        );
    }

    _renderPageIndicator = () => {
        return (
            <CusViewPageIndicator/>
        )
    }

    _renderPage = (banner) => {
        return (
            <View>
                {/*图片一定要设置宽高,否则显示不出来*/}
                <Image
                    style={{
                        width: gScreen.width,
                        height: 150,
                        backgroundColor: '#F5FCFF',
                    }}
                    source={{uri: banner.cover}}
                    resizeMode='contain'
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
}

const styles = StyleSheet.create({
    bannerTextStyle: {
        backgroundColor:'#44B8B8B8',
        width:gScreen.width,
        position: 'absolute',
        bottom: 0,
        padding:5
    }
});
