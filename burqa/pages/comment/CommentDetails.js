/**
 * Created by luthor on 08/06/2017.
 */

import {
    View,StyleSheet,
    Text, TouchableOpacity, Image
} from "react-native";
import React, {Component} from 'react'
import NavigationBar from "../../components/NavigationBar";
import ViewUtils from "../../utils/ViewUtils";
import UpdatePages from "../UpdatePages";

export default class CommentDetails extends Component {

    render() {
        const {data} = this.props;
        return (
            <View>
                {this._navigationBar()}
                <View style={{padding: 10}}>
                    <View style={styles.topStyle}>
                        {/*头像*/}
                        <Image
                            style={{borderRadius: 15, borderColor: '#949a9f', borderWidth: 0.5, height: 30, width: 30}}
                            source={{uri: data.avatar_url}}
                            onLoadEnd={this._onLoadEnd}
                            defaultSource={require('../../res/images/default_avatar.png')}
                            resizeMode='contain'
                        />
                        {/*用户名*/}
                        <Text style={{color: '#2E8FDB', marginLeft: 10}}>
                            {data.nickname}
                        </Text>
                    </View>

                    {/*评论*/}
                    <Text style={{marginLeft: 40, marginTop: 5, marginBottom: 5, color: '#010101'}}>
                        {data.content}
                    </Text>

                    <View style={styles.buttonStyle}>
                        {/*时间*/}
                        <Text style={{alignSelf: 'flex-start', color: '#949a9f', fontSize: 12}}>{data.createtime}</Text>
                        {/*点赞*/}
                        <View style={{position: 'absolute', right: 140, flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={require('../../res/images/ic_drawer_night_mode.png')}
                                   style={{width: 20, height: 20}}/>
                            <Text>点赞 {data.isused}</Text>
                        </View>
                        {/*回复*/}
                        <View style={{position: 'absolute', right: 80, flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={require('../../res/images/ic_drawer_comment.png')}
                                   style={{width: 20, height: 20}}/>
                            <Text onPress={this._onReplyPress}>回复</Text>
                        </View>
                    </View>

                    <View style={{borderBottomWidth: 0.5, marginLeft: 40, marginRight: 10, borderColor: '#949a9f'}}/>
                </View>
            </View>
        )
    }

    _onReplyPress = () => {
        this.props.navigator.push({
            component: UpdatePages,
        })
    }

    //导航栏标题
    _navigationBar() {
        return (
            <NavigationBar
                title='评论详情'
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
    topStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
    },
    buttonStyle: {
        width: gScreen.width,
        marginBottom: 5,
        marginLeft: 40,
        flexDirection: 'row',
        alignItems: 'center',
    }
});

