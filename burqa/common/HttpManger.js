import fetch from "react-native";
const delay = timeout => {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject('请求超时'), timeout * 1000)
    })
}

/**
 * 提供get()方法简化请求
 * @param url
 * @param params
 * @param timeout
 * @returns {*}
 */
const get = ({url, params = {}, timeout}) => {
    const paramArr = []
    if (Object.keys(params).length !== 0) {
        for (const key in params) {
            paramArr.push(`${key}=${params[key]}`)
        }
    }
    const urlStr = `${url}?${paramArr.join('&')}`

    if (timeout === undefined) {
        return fetch(urlStr)
    } else {
        return Promise.race([fetch(urlStr), delay(timeout)])
    }
};

export { get }