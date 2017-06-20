/**
 * Created by luthor on 20/06/2017.
 */
import React, {Component} from 'react'
import {
    StyleSheet,
    View, AppRegistry,
    Text,
    Image, TouchableOpacity, RefreshControl
} from 'react-native'
import {action, computed, observable, runInAction} from "../../../node_modules/mobx/lib/mobx";
import * as HTTPTools from "../utils/HttpTools";
import {apiURL} from "../utils/UrlCons";

export default class FindNovelSubPageStore extends Component {

    @observable novelList = [];
    @observable errorMsg = '';
    @observable page = 0;
    @observable isRefreshing = true;
    @observable isNoMore = true;

    @action
    getData() {
        let url = apiURL.baseUrl + apiURL.novel;
        HTTPTools.get(url)
            .then((dataArr) => {
                this.isNoMore = dataArr.length === 0;
                this.isRefreshing = false;
                //如果page为0就是刷新,替换集合,否则追加集合
                if (this.page === 0) {
                    this.novelList.replace(dataArr);
                } else {
                    this.novelList.splice(this.novelList.length, 0, ...dataArr)
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
    }

    @computed
    get isLoadMore() {
        return this.page !== 1
    }
}
