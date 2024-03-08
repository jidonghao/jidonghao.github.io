import {defineStore} from "pinia";
import {updateVisit} from "~/api/asyncApi/visit.js";

export const useAESKeyStore = defineStore({
    id: 'AESKey',
    state: () => ({
        key: ""
    }),
    actions: {
        setKey(key) {
            // 设置AESKey
            this.key = key
            // 立即调用访客请求
            updateVisit(useRoute().path)
        },
        getKey() {
            return this.key
        }
    }
})