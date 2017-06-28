/**
 * Created by luthor on 22/06/2017.
 */
import React, {Component} from 'react'
import {
    View, StyleSheet,
    Text, Image, Button, TouchableOpacity
} from 'react-native'
import {action, computed, observable} from "../../../node_modules/mobx/lib/mobx";
import {Actions} from 'react-native-router-flux';
import {observer} from 'mobx-react/native'

/**
 * @Description 小说详情头部分
 * @Author lucio
 * @Email lucio0314@163.com
 * @Date 22/06/2017 10:05
 * @Version 1.0.1
 */
export default class NovelHeaderView extends Component {

    @observable numberOfLines = 2;
    @observable requireArrow = require('../res/images/img_open_btn.png');
    @observable isOpen = false;

    static propTypes = {
        name: React.PropTypes.string,
        cover: React.PropTypes.string,
        hot_hits: React.PropTypes.string,
        last_update_time: React.PropTypes.string,
        subscribe_num: React.PropTypes.string,
        types: React.PropTypes.string,
        introduction: React.PropTypes.string,
        newChapter: React.PropTypes.string,
        id: React.PropTypes.string,
    };

    @observer
    render() {
        let newChapter = this.props.newChapter;
        let new_chapter = newChapter.substring(0, newChapter.length - 1);
        return (
            <View style={{flex: 1, backgroundColor: gColors.background}}>
                <View style={{flexDirection: 'row', backgroundColor: '#44B8B8B8', padding: 10}}>
                    <Image source={{uri: this.props.cover}} style={styles.imageStyle}/>
                    <View style={{marginLeft: 10}}>
                        <Text style={{padding: 3, color: 'white'}}>{this.props.name}</Text>
                        <Text style={{padding: 3, color: 'white'}}>{this.props.types}</Text>
                        <Text style={{padding: 3, color: 'white'}}>点击 {this.props.hot_hits}</Text>
                        <Text style={{padding: 3, color: 'white'}}>订阅 {this.props.subscribe_num}</Text>
                        <Text style={{padding: 3, color: 'white'}}>{this.props.last_update_time}</Text>
                        <View style={{flexDirection: 'row', padding: 3}}>
                            <TouchableOpacity style={styles.buttonStyle} onPress={() => alert('订阅小说')}>
                                <Text style={{color: 'white', fontSize: 14, margin: 5}}>订阅小说</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.rightButtonStyle]}
                                              onPress={() => Actions.novelReadListPage({
                                                  'title': this.props.name,
                                                  "id": this.props.id
                                              })}>
                                <Text style={{color: 'white', fontSize: 14, margin: 5}}>开始阅读</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{width: gScreen.width}}>
                    <Text style={{padding: 12, backgroundColor: 'white'}}
                          numberOfLines={this.numberOfLines}>{this.props.introduction}</Text>
                    <TouchableOpacity onPress={() => {
                        this._onPress()
                    }}>
                        <Image source={this.requireArrow} style={styles.arrowStyle}/>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.infoBarStyle} onPress={()=>Actions.comment()}>
                    <Text>分享</Text>
                </TouchableOpacity>
                <View style={[styles.infoBarStyle, {flexDirection: 'row'}]}>
                    <Text style={{marginRight: 10}}>最新章节</Text>
                    <Text style={{color: 'blue', position: 'absolute', right: 20}}
                          numberOfLines={1}>{new_chapter}</Text>
                    <Image source={require('../res/images/img_more_s.png')}
                           style={{height: 16, width: 8, position: 'absolute', right: 10,}}/>
                </View>
                <View style={[styles.infoBarStyle, {flexDirection: 'row'}]}>
                    <Text style={{marginRight: 10}}>小说章节</Text>
                    <TouchableOpacity style={{position: 'absolute', right: 50}} onPress={() => alert("正序")}>
                        <Text>正序</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{position: 'absolute', right: 10}}
                                      onPress={() => alert("倒序")}>
                        <Text style={{color: 'blue'}}>倒序</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _onPress = () => {
        if (this.isOpen) {
            this.isOpen = false;
            this.numberOfLines = 2;
            this.requireArrow = require('../res/images/img_open_btn.png');
        } else {
            this.isOpen = true;
            this.numberOfLines = 0;
            this.requireArrow = require('../res/images/img_close_btn.png');
        }
    }
}

const styles = StyleSheet.create({
    imageStyle: {
        borderRadius: 5,
        height: gDimensions.imageHeight,
        borderWidth: 0.5,
        width: (gScreen.width - 40) / 3,
    },
    buttonStyle: {
        backgroundColor: '#4b89dc',
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 2.5
    },
    rightButtonStyle: {
        marginLeft: 10,
        borderRadius: 2.5,
        borderWidth: 1,
        borderColor: 'white',
        justifyContent: "center",
        alignItems: 'center',
    },
    infoBarStyle: {
        marginTop: 10,
        padding: 16,
        width: gScreen.width,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    arrowStyle: {
        height: 10,
        width: 20,
        position: 'absolute',
        right: 10,
        bottom: 3,
        justifyContent: 'center'
    }
});