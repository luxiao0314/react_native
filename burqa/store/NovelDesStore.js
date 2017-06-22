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

export default class NovelDesStore {
    @observable errorMsg = '';
    @observable volume = [];    //小说多少话
    @observable isRefreshing = false;    //小说多少话

    @observable types = '';
    @observable hot_hits = '';
    @observable cover = '';
    @observable name = '';
    @observable subscribe_num = '';
    @observable last_update_time = '';
    @observable newChapter = '';

    @action
    fetchData() {
        let url = apiURL.baseUrl + apiURL.novel + "244.json";
        HTTPTools.get(url)
            .then((data) => {
                this.isRefreshing = false;
                this.volume = data.volume;

                this.types = data.types[0];
                this.hot_hits = data.hot_hits + "";
                this.cover = data.cover;
                this.name = data.name;
                this.subscribe_num = data.subscribe_num + "";
                this.last_update_time = data.last_update_time + "";
                this.introduction = data.introduction;
                this.newChapter = data.volume[0].volume_name;
            })
            .catch(error => {1
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
        return this.data.length === 0 && this.errorMsg === ''
    }
}