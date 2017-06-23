/**
 * Created by luthor on 23/06/2017.
 */
import React, {Component} from 'react'
import {
    View, StyleSheet,
    Text, Image
} from 'react-native'
import {action, computed, observable} from "../../../node_modules/mobx/lib/mobx";
import * as HTTPTools from "../utils/HttpTools";
import {apiURL} from "../utils/UrlCons";

export default class LatestNovelStore {

    @observable dataList = [];
    @observable errorMsg = '';
    @observable page = 0;
    @observable isRefreshing = true;
    @observable isNoMore = true;

    @action
    fetchData() {
        if (this.isRefreshing) this.page = 0;
        let url = apiURL.baseUrl + apiURL.novel_recentUpdate + "1.json";
        HTTPTools.get(url)
            .then((dataArr) => {
                this.isNoMore = dataArr.length === 0;
                this.isRefreshing = false;
                this.errorMsg = '';
                //如果page为0就是刷新,替换集合,否则追加集合
                if (this.page === 0) {
                    this.dataList.replace(dataArr);
                } else {
                    //这数组使用错误导致加载更多一直不成功
                    this.dataList.splice(this.dataList.length, 0, ...dataArr)
                }
            })
            .catch(error => {
                this.isRefreshing = false;
                if (error.msg) {
                    this.errorMsg = error.msg
                } else {
                    this.errorMsg = error
                }
            });
    };

    @computed
    get isFetching() {
        return this.dataList.length === 0 && this.errorMsg === ''
    }
}