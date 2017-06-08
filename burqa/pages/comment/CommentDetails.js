/**
 * Created by luthor on 08/06/2017.
 */

import {
    View,
    Text
} from "react-native";
import React, {Component} from 'react'
import NavigationBar from "../../components/NavigationBar";
import ViewUtils from "../../utils/ViewUtils";

export default class CommentDetails extends Component {
    render() {
        return (
            <View>
                {this._navigationBar()}
                <Text>
                    111
                </Text>
            </View>
        )
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
