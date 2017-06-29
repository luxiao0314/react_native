/**
 * Created by luthor on 07/06/2017.
 */
import {action, computed, observable, runInAction} from "../../../node_modules/mobx/lib/mobx";
import {
    NativeModules,
} from 'react-native'
/**
 * @Description store类似viewModel,用于储存请求拿到的字段,并不明白action注解有什么用
 * @Author lucio
 * @Email lucio0314@163.com
 * @Date 07/06/2017 10:37 PM
 * @Version 10:37 PM
 */
export default class CommentStore {

    @observable commentList = [];
    @observable errorMsg = '';
    @observable page = 0;
    @observable isRefreshing = true;
    @observable isNoMore = true;
    @observable id = "";

    constructor() {
        this.page = 0;
    }

    @action
    fetchCommentList = async (tag) => {
        if (this.isRefreshing) this.page = 0;
        //http://v2.api.dmzj.com/old/comment/0/0/8765/0.json
        const url = "http://v2.api.dmzj.com/old/comment/0/" + tag + "/" + this.id + "/" + this.page + ".json";

        fetch(url)
            .then((res) => res.json())
            .then((dataArr) => {
                this.isNoMore = dataArr.length === 0;
                this.isRefreshing = false;
                this.errorMsg = '';
                //如果page为0就是刷新,替换集合,否则追加集合
                if (this.page === 0) {
                    this.commentList.replace(dataArr);
                } else {
                    //这数组使用错误导致加载更多一直不成功
                    this.commentList.splice(this.commentList.length, 0, ...dataArr)
                }
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
        return this.commentList.length === 0 && this.errorMsg === ''
    }

    @computed
    get isLoadMore() {
        return this.page !== 1
    }
}