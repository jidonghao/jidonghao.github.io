import {defineStore} from "pinia";
import {GetAESKey} from "~/api/asyncApi/visit.js";


export const useAESKeyStore = defineStore({
    id: 'AESKey',
    state: ()=> ({
        key: ""
    }),
    actions: {
        setKey(key){
            // 设置AESKey
           this.key = key
        },
        getKey(){
            return this.key
        }
    }
})