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
import Slider from "react-native-slider/src/Slider";
import {observable} from "../../../node_modules/mobx/lib/mobx";
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

    @observable sliderValue = 0.2;

    static propTypes = {
        _dialogVisible: React.PropTypes.bool,       //显示还是隐藏
        _onBack: React.PropTypes.func,       //显示还是隐藏
    };

    static defaultProps = {
        _dialogVisible: true,
        _onBack: undefined,
    };

    render() {
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
                        <View style={styles.bottomStyle}>
                            {this._slider()}
                            {this._bottomView()}
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        )
    }

    _slider = () => {
        return (
            <View style={styles.sliderStyle}>
                <Slider
                    value={this.sliderValue}
                    onValueChange={(value) => this.sliderValue = value}/>
            </View>
        )
    };

    _bottomView() {
        return (
            <View style={{flexDirection: 'row', position: 'absolute', bottom: 10}}>
                <View style={styles.textStyle}>
                    <Image source={require('../res/images/img_novel_setting.png')}
                           style={styles.imageStyle}/>
                    <Text style={{color: 'white'}}>设置</Text>
                </View>
                <View style={styles.textStyle}>
                    <Image source={require('../res/images/img_novel_moon.png')}
                           style={styles.imageStyle}/>
                    <Text style={{color: 'white'}}>夜间</Text>
                </View>
                <TouchableOpacity style={styles.textStyle} onPress={()=>PubSub.publish('on_press_dir')}>
                    <Image source={require('../res/images/img_novel_dir.png')}
                           style={styles.imageStyle}/>
                    <Text style={{color: 'white'}}>目录</Text>
                </TouchableOpacity>
                <View style={styles.textStyle}>
                    <Image source={require('../res/images/img_novel_discurss.png')}
                           style={styles.imageStyle}/>
                    <Text style={{color: 'white'}}>吐槽</Text>
                </View>
            </View>
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
    bottomStyle: {
        width: gScreen.width,
        height: 100,
        backgroundColor: 'rgba(52,52,52,0.5)',
        // backgroundColor: 'gray',
        position: 'absolute',
        bottom: 0
    },
    textStyle: {
        flex: 1,
        height: 50,
        width: 30,
        fontSize: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageStyle: {
        width: 15,
        height: 15,
        resizeMode: 'stretch',
        marginBottom: 5
    },
    sliderStyle: {
        marginTop:10,
        height: 30,
        paddingLeft: 10,
        paddingRight: 10,
        alignItems: 'stretch',
        justifyContent: 'center',
    }
});