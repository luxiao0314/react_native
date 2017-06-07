/**
 * Created by luthor on 07/06/2017.
 */

import {action, computed, observable, runInAction} from "../../../../node_modules/mobx/lib/mobx";
import {get} from '../common/HttpTool'
export default class CommentStore {

    @observable commentList = [];
    @observable errorMsg = '';
    @observable page = 1;
    @observable isRefreshing = false;

    constructor(id) {
        this.id = id;
        this.fetchCommentList();
        this.page = 1
    }

    @action
    fetchCommentList = async () => {
        try {
            if (this.isRefreshing) this.page = 1;
            const url = "http://v2.api.dmzj.com/old/comment/0/0/33461/0.json";
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
        }
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