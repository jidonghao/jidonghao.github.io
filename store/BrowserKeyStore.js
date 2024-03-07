import {defineStore} from "pinia";
import FingerprintJS from "@fingerprintjs/fingerprintjs"
export const useBrowserKeyStore = defineStore({
    id: 'BrowserKey',
    state: ()=> ({
        fingerprint: ""
    }),
    actions: {
        async getFingerprint(){
            if(!process.client) throw "非浏览器环境，跳过指纹获取"
            if(this.fingerprint) return this.fingerprint
            else {
                const fingerprint = (await (await FingerprintJS.load()).get()).visitorId
                this.fingerprint = fingerprint
                return fingerprint
            }
        }
    }
})