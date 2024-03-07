import service from "~/utils/request.js";
import {useBrowserKeyStore} from "~/store/BrowserKeyStore.js";
import encryption from "~/utils/encryption.js";
import {useAESKeyStore} from "~/store/AESKeyStore.js";

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
    return service({
        url: "/blog/blogVisit/getKey",
        method: "GET",
    })
}

// TODO: 对访问信息加密

export function updateVisit(pageUrl, blogId = "") {
    useBrowserKeyStore().getFingerprint().then(browserId => {
        console.log("浏览器指纹：", browserId)
        console.log("加密key：", useAESKeyStore().getKey())
        const cipherText =
            encryption(useAESKeyStore().getKey())
                .Encrypt(JSON.stringify({browserId: browserId, pageUrl, blogId, timestamp:new Date().getTime()}))
        PostVisit({data:cipherText})
    })
}