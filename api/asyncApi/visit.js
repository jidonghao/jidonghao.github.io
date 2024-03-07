import service from "~/utils/request.js";
import {useBrowserKeyStore} from "~/store/BrowserKeyStore.js";

/**
 * 访客请求api
 */

/**
 * 发送访客请求
 * @param data
 * @returns {*}
 */
export function PostVisit(data) {
    return service({
        url: "/blog/blogVisit",
        method: "POST",
        data
    })
}

export function updateVisit(pageUrl, blogId = "") {
    useBrowserKeyStore().getFingerprint().then(browserId => {
        console.log("浏览器指纹：", browserId)
        PostVisit({browserId: browserId, pageUrl, blogId})
    })
}