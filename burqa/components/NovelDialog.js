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
import NavigationBar from "./NavigationBar";
import ViewUtils from "../utils/ViewUtils";
const PubSub = require('pubsub-js');

/**
 * @Description 小说分类,过滤dialog
 * @Author lucio
 * @Email lucio0314@163.com
 * @Date 21/06/2017 11:14
 * @Version 1.0.1
 */
@observer
export default class NovelDialog extends Component {

    static propTypes = {
        _dialogVisible: React.PropTypes.bool,       //显示还是隐藏
        _onBack: React.PropTypes.func,       //显示还是隐藏
    };

    static defaultProps = {
        _dialogVisible: true,
        _onBack: undefined,
    };

    render() {
        let bottom = {
            width: gScreen.width,
            height: 100,
            // backgroundColor: 'rgba(52,52,52,0.5)',
            backgroundColor: 'gray',
            position: 'absolute',
            bottom: 0
        };
        let textStyle = {flex: 1, textColor: 'white', justifyContent: 'center', height: 50, fontSize: 18};
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
                    PubSub.publish('novel_dialog_visible', false);
                }}>
                    <View style={styles.bg}>
                        <NavigationBar
                            title='更新'
                            leftButton={ViewUtils.getLeftButton(() => PubSub.publish('finish_photo_view'))}
                            style={{backgroundColor: '#FF9800'}}/>

                        <View style={bottom}>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={textStyle}>设置</Text>
                                <Text style={textStyle}>夜间</Text>
                                <Text style={textStyle}>目录</Text>
                                <Text style={textStyle}>吐槽</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
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
    },
    dialog: {
        width: gScreen.width,
        backgroundColor: 'white',
        position: 'absolute',
        top: 0
    },
});