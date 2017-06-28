/**
 * Created by lucio on 11/06/2017.
 */

import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    View,
    Text, Image, ScrollView, TouchableOpacity,
} from 'react-native';
import GridView from "./GridView";
import {observer} from 'mobx-react/native'
import {Actions} from 'react-native-router-flux';

/**
 * @Description girdView条目
 * @Author lucio
 * @Email lucio0314@163.com
 * @Date 11/06/2017 11:35 AM
 * @Version 11:35 AM
 */
@observer
export default class NovelItemView extends Component {

    static propTypes = {
        data: PropTypes.object,
        title: PropTypes.string,
    };

    static defaultProps = {
        data: [],
        title: '',
    };

    render() {
        const {data} = this.props.data;
        return (
            <View style={{backgroundColor: 'white', marginBottom: 10}}>
                <Text numberOfLines={1} style={{marginLeft: 10, marginTop: 10}}>
                    {this.props.title}
                </Text>
                {this._itemView(data)}
            </View>
        )
    }

    _itemView(data) {
        return (
            <GridView
                style={{padding: 5}}
                items={Array.from(data)}
                itemsPerRow={3}
                renderItem={this._renderImageItem}/>
        )
    }

    _renderImageItem(rowData) {
        let reactid = 0;
        return (
            <TouchableOpacity key={rowData.obj_id} onPress={() => {
                Actions.novelDesPage({"title": rowData.title, "obj_id": rowData.obj_id});
            }}>
                <View style={styles.gridItemStyle}>
                    <Image style={styles.imageStyle}
                           source={{uri: rowData.cover}}
                           defaultSource={require('../res/images/define_empty.png')}/>
                    <Text style={styles.titleStyle}
                          numberOfLines={1}>{rowData.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    imageStyle: {
        borderRadius: 5,
        borderWidth: 0.5,
        height: gDimensions.imageHeight,
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
        height: gDimensions.imageHeight + 20,
        margin: 5
    },
});
