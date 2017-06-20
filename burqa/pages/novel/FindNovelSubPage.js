/**
 * Created by lucio on 19/06/2017.
 */
import React, {Component} from 'react'
import {
    View,
    Text
} from 'react-native'
import Router from "react-native-router-flux/src/Router";
import Scene from "react-native-router-flux/src/Scene";
import FindNovelSubPageStore from "../../store/FindNovelSubPageStore";

/**
 * @Description 小说分类列表
 * @Author lucio
 * @Email lucio0314@163.com
 * @Date 20/06/2017 16:11
 * @Version 1.0.2
 */
export default class FindNovelSubPage extends Component {


    constructor() {
        super();
        this.findNovelSubPageStore = new FindNovelSubPageStore()
    }

    componentDidMount() {
        this.findNovelSubPageStore.getData();
    }

    componentWillMount() {
        const {errorMsg} = this.findNovelSubPageStore;
        errorMsg && alert(errorMsg)
    }

    render() {
        return (
            <Text>啊啊啊啊啊</Text>
        );
    }
}