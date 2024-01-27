/**
 * 同步使用的api，在页面水合前就需要获取的数据
 */

import FetchData from "~/utils/fetchData.js";

export function useBlogList(data,watch = null) {
    return FetchData('blog/blog/getList', data, watch);
}
