import {GetAESKey, updateVisit} from "~/api/asyncApi/visit";
import {useAESKeyStore} from "~/store/AESKeyStore";
const BlogKey = await GetAESKey()

export default function defineNuxtRouterMiddleware(to, from) {
    useAESKeyStore().setKey(BlogKey) // 设置key
    // 上报访问数据
    updateVisit(to.fullPath, to.params?.id || "")
}