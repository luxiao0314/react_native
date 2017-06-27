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

/**
 * @Description 下载小说,读取小说并实现分页
 * @Author lucio
 * @Email lucio0314@163.com
 * @Date 27/06/2017 9:00 PM
 * @Version 9:00 PM
 */
export default class NovelPhotoViewStore {

    @observable content = [];
    @observable chapter_id = '';

    @action
    fetchData() {
        //http://v2.api.dmzj.com/novel/download/2134_7827_61265.txt
        let url = apiURL.baseUrl + apiURL.novel_download + "2134_7827_" + this.chapter_id + ".txt";
        const path = RNFS.DocumentDirectoryPath + '/' + encodeURIComponent(url);
        this.downloadFile(path, url);
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
                if (result.length !== 0) {
                    this.computer(result);
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

    computer(result) {
        //假设每页900字,计算出页数
        let num = 850;
        let pages = parseInt(result.length / num);
        let dataArr = [];
        for (let i = 1; i <= pages; i++) {
            let content = result.substring(num * (i - 1), num * i);
            dataArr.push(content)
        }
        this.content.replace(dataArr);
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