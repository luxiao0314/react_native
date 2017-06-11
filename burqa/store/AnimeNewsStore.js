/**
 * Created by lucio on 10/06/2017.
 */
import {action, computed, observable} from "../../../node_modules/mobx/lib/mobx";
/**
 * @Description 动漫资讯store
 * @Author lucio
 * @Email lucio0314@163.com
 * @Date 10/06/2017 1:42 PM
 * @Version 1:42 PM
 */
export default class AnimeNewsStore {

    @observable errorMsg = '';
    @observable dataArr = [];
    @observable banner = [];    //轮播图

    @action
    fetchData = async () => {
        const url = "http://v2.api.dmzj.com/novel/recommend.json";
        fetch(url)
            .then((res) => res.json())
            .then((dataArr) => {
                this.dataArr = dataArr;
                this.banner = dataArr[0].data;
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