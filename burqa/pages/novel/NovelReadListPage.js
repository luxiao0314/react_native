/**
 * Created by luthor on 24/06/2017.
 */
import React, {Component} from 'react'
import {
    View, StyleSheet,
    Text, Image, ListView, RefreshControl, SectionList
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
        this.novelReadListStore.fetchData();
    }

    render() {
        const {dataArr, isRefreshing} = this.novelReadListStore;
        let dataBlob = dataArr.slice(0);
        return (
            <ListView
                ref='list'
                dataSource={this.state.dataSource.cloneWithRowsAndSections(dataBlob, this._sectionIds(dataBlob), this._rowIds(dataBlob)) }
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

    _sectionIds = (dataBlob) => {
        let sectionIdentities = [];
        for (let sectionIndex in dataBlob) {
            sectionIdentities.push(sectionIndex);
        }
        return sectionIdentities
    };

    _rowIds = (dataBlob) => {
        let rowIdentities = [];
        for (let sectionIndex in dataBlob) {
            let section = dataBlob[sectionIndex];
            let sectionArray = []
            for (let rowIndex in section.chapters.slice(0)) {
                sectionArray.push(rowIndex);
            }
            rowIdentities.push(sectionArray)
        }
        return rowIdentities
    };

    _renderRow = (rowData: string, sectionID: number, rowID: number) => {
        return (
            <Text>{rowData.chapter_name}</Text>
        );
    };

    _renderSectionHeader = (sectionHeadData, sectionID) => {
        return (
            <Text>{sectionHeadData}</Text>
        );
    };

    _onRefresh = () => {
        this.novelReadListStore.isRefreshing = true;
        this.novelReadListStore.fetchData();
    };
}