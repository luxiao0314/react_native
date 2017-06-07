/**
 * Created by luthor on 07/06/2017.
 */

import React, {Component} from 'react'
import {
    Animated,
    StyleSheet,
    View,
    Text,
    AppRegistry
} from 'react-native'

import Comment from "./pages/comment/Comment";

export default class App extends Component {

    render() {
        return (
            <View style={{flex: 1}}>
                <Comment/>
            </View>
        )
    }
}
