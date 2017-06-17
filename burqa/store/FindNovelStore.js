/**
 * Created by lucio on 10/06/2017.
 */
import {action, computed, observable} from "../../../node_modules/mobx/lib/mobx";
/**
 * @Description 找小说store
 * @Author lucio
 * @Email lucio0314@163.com
 * @Date 10/06/2017 1:42 PM
 * @Version 1:42 PM
 */
export default class FindNovelStore {

    @observable errorMsg = '';
    @observable dataArr = [];
    @observable isRefreshing = true;

    @action
    fetchData = async () => {
        const url = "http://v2.api.dmzj.com/1/category.json";
        fetch(url)
            .then((res) => res.json())
            .then((dataArr) => {
                this.dataArr = dataArr;
                this.isRefreshing = false;
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

    @computed
    get isFetching() {
        return this.dataArr.length === 0 && this.errorMsg === ''
    }
}