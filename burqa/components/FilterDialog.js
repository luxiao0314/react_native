/**
 * Created by luthor on 21/06/2017.
 */
import React, {Component} from 'react'
import {
    View, StyleSheet,
    Text, Image, Modal, TouchableOpacity
} from 'react-native'
import GridView from "./GridView";
import {observer} from 'mobx-react/native'
import FilterStore from "../store/FilterStore";
const PubSub = require('pubsub-js');

/**
 * @Description 小说分类,过滤dialog
 * @Author lucio
 * @Email lucio0314@163.com
 * @Date 21/06/2017 11:14
 * @Version 1.0.1
 */
@observer
export default class FilterDialog extends Component {

    static propTypes = {
        _dialogVisible: React.PropTypes.bool,       //显示还是隐藏
    };

    static defaultProps = {
        _dialogVisible: false,
    };

    constructor() {
        super();
        this.filterStore = new FilterStore();
    }

    render() {
        const {dataArr} = this.filterStore;
        return (
            <Modal
                animationType='fade'
                visible={this.props._dialogVisible}
                transparent={true}
                onRequestClose={() => { //如果是Android设备 必须有此方法
                    this.onRequestClose()
                }}>
                <TouchableOpacity onPress={() => {
                    //rn组件通信
                    PubSub.publish('dialogVisible', false);
                }}>
                    <View style={styles.bg}>
                        <View style={styles.dialog}>
                            <Text>1111111111111</Text>
                            <GridView
                                style={styles.gridViewStyle}
                                items={Array.from(dataArr)}
                                itemsPerRow={4}
                                renderItem={this._renderImageItem}
                                enableEmptySections={true}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    _renderImageItem = (rowData) => {
        return (
            <TouchableOpacity activeOpacity={0} onPress={() => this._onPress(rowData)}>
                <View style={styles.gridItemStyle} key={rowData.cover}>
                    <View style={styles.chapterNameStyle}>
                        <Text
                            style={{color: 'white', margin: 3, fontSize: 12}}
                            numberOfLines={1}>{rowData.tag_name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };
}

const styles = StyleSheet.create({
    gridViewStyle: {
        padding: 5
    },
    gridItemStyle: {
        width: (gScreen.width - 40) / 4,
        height: 180,
        margin: 5
    },
    imageStyle: {
        borderRadius: 5,
        height: 150,
        borderWidth: 0.5,
    },
    chapterNameStyle: {
        width: (gScreen.width - 40) / 4,
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
    },
    bg: {  //全屏显示 半透明 可以看到之前的控件但是不能操作了
        width: gScreen.width,
        height: gScreen.height,
        backgroundColor: 'rgba(52,52,52,0.5)',  //rgba  a0-1  其余都是16进制数
        justifyContent: 'center',
        alignItems: 'center',
    },
    dialog: {
        width: gScreen.width * 0.8,
        height: gScreen.height * 0.28,
        backgroundColor: 'white',
        borderRadius: 8,
    },
});