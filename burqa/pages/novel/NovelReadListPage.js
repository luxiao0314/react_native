/**
 * Created by luthor on 24/06/2017.
 */
import React, {Component} from 'react'
import {
    View, StyleSheet,
    Text, Image, ListView, RefreshControl, SectionList, TouchableOpacity
} from 'react-native'
import NovelReadListStore from "../../store/NovelReadListStore";
import {Actions} from 'react-native-router-flux';
import {observer} from 'mobx-react/native'

const getSectionData = (dataBlob, sectionID) => {
    return dataBlob[sectionID];
};

const getRowData = (dataBlob, sectionID, rowID) => {
    return dataBlob[sectionID + ':' + rowID];
};

@observer
export default class NovelReadListPage extends Component {

    state = {
        dataSource: new ListView.DataSource({
            getSectionData: getSectionData, // 获取组中数据
            getRowData: getRowData, // 获取行中的数据
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        })
    };

    constructor() {
        super();
        this.novelReadListStore = new NovelReadListStore();
    }

    componentDidMount() {
        Actions.refresh({
            title: this.props.title
        });
        this.novelReadListStore.id = this.props.id;
        this.novelReadListStore.fetchData((data) => { //使用回调函数,请求执行完成执行下面方法
            this.load(Array.from(data));
        });
    }

    render() {
        const {isRefreshing} = this.novelReadListStore;
        return (
            <ListView
                style={{flex: 1, backgroundColor: gColors.background}}
                ref='list'
                dataSource={this.state.dataSource}
                //item布局
                renderRow={this._renderRow.bind(this)}
                renderSectionHeader={this._renderSectionHeader.bind(this)}
                //刷新控制器
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={this._onRefresh}
                        colors={['rgb(217, 51, 58)']}/>
                }>
            </ListView>
        )
    };

    load = (jsonData) => {

        const dataBlob = {};
        const sectionIDs = [];
        const rowIDs = [];

        //    定义变量
        for (let i = 0; i < jsonData.length; i++) {
            //    1.拿到所有的sectionId
            sectionIDs.push(i);
            //    2.把组中的内容放入dataBlob内容中
            dataBlob[i] = jsonData[i].volume_name;
            //    3.设置改组中每条数据的结构
            rowIDs[i] = [];
            //    4.取出改组中所有的数据
            const cars = Array.from(jsonData[i].chapters);
            //    5.便利cars,设置每组的列表数据
            for (let j = 0; j < cars.length; j++) {
                //    改组中的每条对应的rowId
                rowIDs[i].push(j);
                // 把每一行中的内容放入dataBlob对象中
                dataBlob[i + ':' + j] = cars[j];
            }
        }
        if (jsonData.length !== 0) {
            // 更新状态
            this.setState({
                dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
            });
        }
    };

    _renderRow = (rowData: string, sectionID: number, rowID: number) => {
        return (
            <TouchableOpacity onPress={() => alert(rowData.chapter_name)}>
                <Text numberOfLines={1} style={{
                    width: gScreen.width,
                    padding: 10,
                    marginBottom: 1,
                    backgroundColor: 'white'
                }}>{rowData.chapter_name}</Text>
            </TouchableOpacity>
        );
    };

    _renderSectionHeader = (sectionHeadData, sectionID) => {
        return (
            <TouchableOpacity onPress={() => Actions.novelPhotoView()}>
                <Text numberOfLines={1} style={{
                    width: gScreen.width,
                    fontSize: 18,
                    padding: 10,
                    backgroundColor: '#00666666'
                }}>• {sectionHeadData} •</Text>
            </TouchableOpacity>
        );
    };

    _onRefresh = () => {
        this.novelReadListStore.isRefreshing = true;
        this.novelReadListStore.fetchData();
    };
}