/**
 * Created by lucio on 20/06/2017.
 */
import React, {Component, PropTypes} from 'react'
import {
    View, Image, StyleSheet,
    Text, RefreshControl, TouchableOpacity
} from 'react-native'
import GridView from "./GridView";
import LoadMoreFooter from "./LoadMoreFooter";
import {observer} from 'mobx-react/native'

@observer
export default class RefreshLoadGridView extends Component {

    static propTypes = {
        dataArr: PropTypes.array,
        isRefreshing: PropTypes.bool,
        isNoMore: PropTypes.bool,
        onEndReach: PropTypes.func,
        onRefresh: PropTypes.func
    };

    static defaultProps = {
        dataArr: [],
        isRefreshing: null,
        isNoMore: null,
        onEndReach: undefined,
        onRefresh: undefined,
    };

    render() {
        const {dataArr, isRefreshing, isNoMore, onEndReach, onRefresh} = this.props;
        return (
            <GridView
                style={styles.gridViewStyle}
                items={dataArr}
                itemsPerRow={3}
                renderItem={this._renderImageItem}
                //加载更多脚布局
                renderFooter={() => this._renderFooter(isRefreshing, isNoMore)}
                enableEmptySections={true}
                onEndReached={onEndReach}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                        colors={['rgb(217, 51, 58)']}/>
                }
            />
        );
    }


    _renderFooter = (isRefreshing, isNoMore) => <LoadMoreFooter isRefresh={isRefreshing}
                                                                isNoMore={isNoMore}/>;

    _renderImageItem = (rowData) => {
        return (
            <TouchableOpacity onPress={() => this._onPress(rowData)}>
                <View style={styles.gridItemStyle} key={rowData.cover}>
                    <Image key={rowData} source={{uri: rowData.cover}} style={styles.imageStyle}
                           defaultSource={require('../res/images/define_empty.png')}/>
                    <View style={styles.chapterNameStyle}>
                        <Text
                            style={{color: 'white', margin: 3, fontSize: 12}}
                            numberOfLines={1}>{rowData.last_update_chapter_name}</Text>
                    </View>
                    <Text style={styles.titleStyle} numberOfLines={1}>{rowData.title}</Text>
                </View>
            </TouchableOpacity>
        )
    };
}

const styles = StyleSheet.create({
    gridViewStyle: {
        padding: 5
    },
    gridItemStyle: {
        width: (gScreen.width - 40) / 3,
        height: 180,
        margin: 5
    },
    imageStyle: {
        borderRadius: 5,
        height: gDimensions.imageHeight,
        borderWidth: 0.5,
    },
    chapterNameStyle: {
        width: (gScreen.width - 40) / 3,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: '#44B8B8B8',
        position: 'absolute',
        bottom: 30,
    },
    titleStyle: {
        position: 'absolute',
        left: 0,
        padding: 2,
        bottom: 0,
    }
});
