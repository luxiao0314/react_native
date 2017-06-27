/**
 * @Description
 * @Author lucio
 * @Email lucio0314@163.com
 * @Date 27/06/2017$
 * @Version
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text, Image
} from 'react-native';
import {action, observable} from "../../../node_modules/mobx/lib/mobx";
import {apiURL} from "../utils/UrlCons";
const RNFS = require('react-native-fs');
let jobId = -1;

export default class NovelPhotoViewStore {

    @observable dataArr = [];
    @observable errorMsg = '';
    @observable isRefreshing = true;
    @observable id = '';

    @action
    fetchData() {
        //http://v2.api.dmzj.com/novel/download/2134_7827_61265.txt
        let url = apiURL.baseUrl + apiURL.novel_download + "2134_7827_61265.txt";
        const path = RNFS.DocumentDirectoryPath + '/demo.txt';
        this.downloadFile(path,url);
        this.readFile(path);
        // this.writeFile();
    };

    downloadFile = (path, url) => {
        RNFS.downloadFile({
            fromUrl: url,
            toFile: path,
        }).promise.then(res => {
            this.readFile(path);
        }).catch((error) => {
            if (error.msg) {
                this.errorMsg = error.msg
            } else {
                this.errorMsg = error
            }
        });
    };

    /*读取txt文件内容*/
    readFile(path) {
        return RNFS.readFile(path)
            .then((result) => {
                console.log(result);
                alert(result);
            })
            .catch((err) => {
                console.log(err.message);
                alert(err.message)
            });
    }

    /*将文本写入本地 txt*/
    writeFile() {
        // create a path you want to write to
        const path = RNFS.DocumentDirectoryPath + '/test.txt';

        // write the file
        RNFS.writeFile(path, '这是一段文本，YES', 'utf8')
            .then((success) => {
                console.log('path', path);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }
}