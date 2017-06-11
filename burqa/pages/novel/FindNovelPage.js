/**
 * Created by lucio on 11/06/2017.
 */
import React, {Component} from 'react'
import {
    Animated,
    StyleSheet,
    View,
    Text,
    AppRegistry, ListView, RefreshControl, Image, TouchableOpacity
} from 'react-native'
import NavigationBar from "../../components/NavigationBar";
import ViewUtils from "../../utils/ViewUtils";
import GridView from "../../components/GridView";
import FindNovelStore from "../../store/FindNovelStore";
import {observer} from 'mobx-react/native'

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
        this.findNovelStore.fetchData();
    }

    componentWillMount() {
        const {errorMsg} = this.findNovelStore;
        errorMsg && alert(errorMsg)
    }

    render() {
        const {dataArr} = this.findNovelStore;
        return (
            <View>
                <NavigationBar
                    title='找小说'
                    leftButton={ViewUtils.getLeftButton(() => this._onBack())}
                    style={{backgroundColor: 'orange'}}/>

                <GridView
                    style={{padding: 5}}
                    items={Array.from(dataArr)}
                    itemsPerRow={3}
                    renderItem={this._renderImageItem}
                />
            </View>
        )
    };

    _renderImageItem(rowData) {
        return (
            <View style={styles.gridItemStyle} key={rowData.cover}>
                <Image style={styles.imageStyle}
                       source={{uri: rowData.cover}}
                       resizeMode='contain'
                       defaultSource={require('../../res/images/define_empty.png')}/>
                <Text style={styles.titleStyle} numberOfLines={1}>{rowData.title}</Text>
            </View>
        )
    };

    _onBack = () => {
        const {navigator, onResetBarStyle} = this.props;
        onResetBarStyle && onResetBarStyle();
        navigator.pop()
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
