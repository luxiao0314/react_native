/**
 * Created by luthor on 21/06/2017.
 */
import React, {Component} from 'react'
import {
    View, StyleSheet, Platform,
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
        type: React.PropTypes.string,       //显示还是隐藏
    };

    static defaultProps = {
        _dialogVisible: false,
        type: "funny",
    };

    constructor() {
        super();
        this.filterStore = new FilterStore();
    }

    componentWillMount() {
        const {errorMsg} = this.filterStore;
        errorMsg && alert(errorMsg)
    }


    render() {
        if (this.props._dialogVisible) {
            this.filterStore.fetchData("progress" === this.props.type ? "progress" : "funny");
        }
        const {dataArr} = this.filterStore;
        return (
            <Modal
                animationType='fade'
                visible={this.props._dialogVisible}
                transparent={true}
                onRequestClose={() => { //如果是Android设备 必须有此方法
                    this.onRequestClose()
                }}>
                <TouchableOpacity activeOpacity={1} onPress={() => {
                    //rn组件通信
                    PubSub.publish('dialogVisible', false);
                }}>
                    <View style={styles.bg}>
                        <View style={styles.dialog}>
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
            <TouchableOpacity activeOpacity={0.5} onPress={() => this._onPress(rowData.tag_id)}>
                <View style={styles.chapterNameStyle}>
                    <Text
                        key={rowData.cover}
                        style={{margin: 3, fontSize: 12}}
                        numberOfLines={1}>{rowData.tag_name}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    _onPress(tag_id) {
        //rn组件通信
        if ("progress" === this.props.type) {
            PubSub.publish('type', tag_id);
        } else {
            PubSub.publish('tag_id', tag_id);
        }
    }
}

const styles = StyleSheet.create({
    gridViewStyle: {
        padding: 5
    },
    chapterNameStyle: {
        height: 30,
        backgroundColor: '#44B8B8B8',
        margin: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: (gScreen.width - 20) / 4,
        borderRadius: 3,
    },
    bg: {  //全屏显示 半透明 可以看到之前的控件但是不能操作了
        width: gScreen.width,
        height: gScreen.height,
        top: Platform.OS === 'android' ? 54 + 40 : 64 + 40,
        backgroundColor: 'rgba(52,52,52,0.5)',  //rgba  a0-1  其余都是16进制数
    },
    dialog: {
        width: gScreen.width,
        backgroundColor: 'white',
        position: 'absolute',
        top: 0
    },
});