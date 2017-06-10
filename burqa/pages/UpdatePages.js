/**
 * Created by luthor on 09/06/2017.
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    Text, Image,
} from 'react-native';
import GridView from "../components/GridView";
import NavigationBar from "../components/NavigationBar";
import ViewUtils from "../utils/ViewUtils";
import UpdatePageStore from "../store/UpdatePageStore";
import {observer} from 'mobx-react/native'

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

    render() {
        const {updateList} = this.updatePageStore;
        return (
            <View style={{flex: 1}}>
                {this._navigationBar()}
                <GridView
                    style={styles.gridViewStyle}
                    items={Array.from(updateList)}
                    itemsPerRow={3}
                    renderItem={this._renderImageItem}
                />
            </View>
        )
    }

    //导航栏标题
    _navigationBar() {
        return (
            <NavigationBar
                title='更新'
                leftButton={ViewUtils.getLeftButton(() => this._onBack())}
                style={{backgroundColor: 'orange'}}/>
        )
    };

    _renderImageItem(rowData) {
        return (
            <View style={styles.gridItemStyle} key={rowData.cover}>
                <Image key={rowData} source={{uri: rowData.cover}} style={styles.imageStyle}
                       resizeMode='contain'
                       defaultSource={require('../res/images/define_empty.png')}/>
                <View style={styles.chapterNameStyle}>
                    <Text style={{color: 'white', margin: 3, fontSize: 12}}>{rowData.last_update_chapter_name}</Text>
                </View>
                <Text style={styles.titleStyle} numberOfLines={1}>{rowData.title}</Text>
            </View>
        )
    }

    _onBack = () => {
        const {navigator, onResetBarStyle} = this.props;
        onResetBarStyle && onResetBarStyle();
        navigator.pop()
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

