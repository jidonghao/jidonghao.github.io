import service from "~/utils/request.js";
import {useBrowserKeyStore} from "~/store/BrowserKeyStore.js";
import encryption from "~/utils/encryption.js";
import {useAESKeyStore} from "~/store/AESKeyStore.js";
import FetchData from "~/utils/fetchData.js";

/**
 * 访客请求api
 */

/**
 * 发送访客请求
 * @param data
 * @returns {*}
 */
function PostVisit(data) {
    return service({
        url: "/blog/blogVisit",
        method: "POST",
        data
    })
}

/**
 * 获取加密接口访问key
 */
export function GetAESKey() {
    return FetchData('blog/blogVisit/getKey', null, null, 'getKey');
}
let timer = void 0
export function updateVisit(pageUrl, blogId = "") {
    const key = useAESKeyStore().getKey()
    if(!key) {
        return false
    }
    useBrowserKeyStore().getFingerprint().then(browserId => {
        const cipherText =
            encryption(key)
                .Encrypt(JSON.stringify({
                    browserId: browserId,
                    pageUrl,
                    blogId,
                    timestamp: new Date().getTime()
                }))
        PostVisit({data: cipherText})
    })
}