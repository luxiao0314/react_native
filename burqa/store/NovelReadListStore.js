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

    @action
    fetchData() {
        let url = apiURL.baseUrl + apiURL.novel_chapter + "1714.json";
        HTTPTools.get(url)
            .then((dataArr) => {
                this.isRefreshing = false;
                this.errorMsg = '';
                this.dataArr.replace(dataArr);
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