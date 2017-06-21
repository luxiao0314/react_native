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

    @observable updateList = [];
    @observable errorMsg = '';
    @observable page = 0;
    @observable isRefreshing = true;
    @observable isNoMore = true;
    @observable tag_id = 0;
    @observable type = '1';

    @action
    getData() {
        let url = apiURL.baseUrl + apiURL.novel + this.tag_id + "/" + this.type + "/0/" + this.page + ".json";
        HTTPTools.get(url)
            .then((dataArr) => {
                this.isNoMore = dataArr.length === 0;
                this.isRefreshing = false;
                //如果page为0就是刷新,替换集合,否则追加集合
                if (this.page === 0) {
                    this.updateList.replace(dataArr);
                } else {
                    this.updateList.splice(this.updateList.length, 0, ...dataArr)
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
