/**
 * Created by luthor on 23/06/2017.
 */
import React, {Component} from 'react'
import {
    View, StyleSheet,
    Text, Image
} from 'react-native'

export default class CommStyle extends Component {
    static styles = StyleSheet.create({
        imageStyle: {
            borderRadius: 5,
            height: gDimensions.imageHeight,
            borderWidth: 0.5,
            width: (gScreen.width - 40) / 3,
        },
        titleStyle: {
            position: 'absolute',
            left: 0,
            margin: 2,
            bottom: 0,
        },
        gridItemStyle: {
            width: (gScreen.width - 40) / 3,
            height: (gScreen.width - 40) / 3 + 20,
            margin: 5
        },
    });
}