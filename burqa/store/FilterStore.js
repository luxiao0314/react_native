/**
 * Created by luthor on 21/06/2017.
 */
import React, {Component} from 'react'
import {
    View, StyleSheet,
    Text, Image
} from 'react-native'
import {action, computed, observable} from "../../../node_modules/mobx/lib/mobx";
import * as HTTPTools from "../utils/HttpTools";
import {apiURL} from "../utils/UrlCons";

export default class FilterStore {
    @observable errorMsg = '';
    @observable dataArr = [];

    @action
    fetchData = async () => {
        let url = apiURL.baseUrl + apiURL.novel + this.tag_id + "/0/0/" + this.page + ".json";
        HTTPTools.get(url)
            .then((dataArr) => {
                this.updateList.replace(dataArr.items);
            })
            .catch(error => {
                if (error.msg) {
                    this.errorMsg = error.msg
                } else {
                    this.errorMsg = error
                }
            });
    };

    @computed
    get isFetching() {
        return this.dataArr.length === 0 && this.errorMsg === ''
    }
}