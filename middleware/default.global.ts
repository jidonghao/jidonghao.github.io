import {updateVisit} from "~/api/asyncApi/visit"

export default function defineNuxtRouterMiddleware(to, from) {
    // 上报访问数据
    updateVisit(to.fullPath, to.params?.id || "")
}