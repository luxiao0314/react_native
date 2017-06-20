/**
 * Created by lucio on 20/06/2017.
 */

import React, {Component} from 'react'
import {
    View, StyleSheet,
    Text, RefreshControl, TouchableOpacity, Image
} from 'react-native'

export default class TextView extends Component {

    static propTypes = {
        text: React.PropTypes.string,
        drawRight: React.PropTypes.object,
    };

    render() {
        const {text, drawRight} = this.props;
        return (
            <View style={{flexDirection: 'row', padding: 10,justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:16}}>{text}</Text>
                <Image style={{marginLeft:5}} source={drawRight} resizeMode='stretch'/>
            </View>
        )
    }
}
