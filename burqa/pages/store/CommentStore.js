/**
 * Created by luthor on 07/06/2017.
 */

import {action, computed, observable, runInAction} from "../../../../node_modules/mobx/lib/mobx";
import {get} from '../common/HttpTool'
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
    @observable page = 1;
    @observable isRefreshing = false;
    @observable isNoMore = true;
    @observable id = 0;

    constructor() {
        this.id = 0;
        this.page = 1
        this.fetchCommentList();
    }

    @action
    fetchCommentList = async () => {
        if (this.isRefreshing) this.page = 1;
        const url = "http://v2.api.dmzj.com/old/comment/0/0/33461/" + this.id + ".json";

        fetch(url)
            .then((res) => res.json())
            .then((dataArr) => {
                this.isNoMore = dataArr.length === 0;
                this.isRefreshing = false;
                this.errorMsg = '';
                if (this.page === 1) {
                    this.commentList.replace(dataArr);
                } else {
                    this.commentList.splice(dataArr.length, 0, dataArr)
                }
            })
            .catch(error => {
                if (error.msg) {
                    this.errorMsg = error.msg
                } else {
                    this.errorMsg = error
                }
            });

        /*try {
         const params = {
         page: this.page,
         id: this.id,
         per: 10
         };
         const dataArr = await get({url, timeout: 20}).then(response => response.json());
         runInAction(() => {
         this.isRefreshing = false;
         this.errorMsg = '';
         this.commentList.replace(dataArr);
         })
         } catch (error) {
         if (error.msg) {
         this.errorMsg = error.msg
         } else {
         this.errorMsg = error
         }
         }*/
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