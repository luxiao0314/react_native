/**
 * Created by luthor on 24/06/2017.
 */
import React, {Component} from 'react'
import {
    View, StyleSheet,
    Text, Image
} from 'react-native'
import {action, computed, observable} from "../../../node_modules/mobx/lib/mobx";
import * as HTTPTools from "../utils/HttpTools";
import {apiURL} from "../utils/UrlCons";

export default class NovelReadListStore extends Component {

    @observable dataArr = [];
    @observable errorMsg = '';
    @observable isRefreshing = true;
    @observable id = '';

    @action
    fetchData(callBack) {
        let url = apiURL.baseUrl + apiURL.novel_chapter + this.id + ".json";
        console.log(url);
        HTTPTools.get(url)
            .then((data) => {
                this.isRefreshing = false;
                this.errorMsg = '';
                this.dataArr.replace(data);
                callBack(this.dataArr);
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
}