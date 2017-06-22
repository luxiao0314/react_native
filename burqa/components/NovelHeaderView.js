/**
 * Created by luthor on 22/06/2017.
 */
import React, {Component} from 'react'
import {
    View, StyleSheet,
    Text, Image, Button, TouchableOpacity
} from 'react-native'

/**
 * @Description 小说详情头部分
 * @Author lucio
 * @Email lucio0314@163.com
 * @Date 22/06/2017 10:05
 * @Version 1.0.1
 */
export default class NovelHeaderView extends Component {

    static propTypes = {
        name: React.PropTypes.string,
        cover: React.PropTypes.string,
        hot_hits: React.PropTypes.string,
        last_update_time: React.PropTypes.string,
        subscribe_num: React.PropTypes.string,
        types: React.PropTypes.string,
        introduction: React.PropTypes.string,
        newChapter: React.PropTypes.array,
    };

    render() {
        let newChapter = this.props.newChapter.replace("'\r'", '');
        return (
            <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
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
                            <TouchableOpacity style={[styles.rightButtonStyle]} onPress={() => alert('开始阅读')}>
                                <Text style={{color: 'white', fontSize: 14, margin: 5}}>开始阅读</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{width: gScreen.width}}>
                    <Text style={{padding: 10, backgroundColor: 'white'}}
                          numberOfLines={2}>{this.props.introduction}</Text>
                    <TouchableOpacity onPress={() => alert('显示全部')}>
                        <Image source={require('../res/images/ic_tiaozhuan.png')}
                               style={{position: 'absolute', right: 0, bottom: 0, justifyContent: 'center'}}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.infoBarStyle}>
                    <Text>分享</Text>
                </View>
                <View style={[styles.infoBarStyle, {flexDirection: 'row', justifyContent: 'center'}]}>
                    <Text style={{marginRight: 10}}>最新章节</Text>
                    {/*<Text style={{color:'blue'}}>{newChapter}</Text>*/}
                    <Text style={{color: 'blue'}}>第1卷 Public Enemy Number91</Text>
                </View>
                <View style={[styles.infoBarStyle, {flexDirection: 'row'}]}>
                    <Text style={{marginRight: 10}}>小说章节</Text>
                    <Text style={{position: 'absolute', right: 50}}>正序</Text>
                    <Text style={{color: 'blue', position: 'absolute', right: 10}}>倒序</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    imageStyle: {
        borderRadius: 5,
        height: 145,
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
    }
});