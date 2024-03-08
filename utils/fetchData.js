// useApiData.js

/**
 * 页面水合前的异步数据获取
 * @param apiEndpoint
 * @param params
 * @param watch
 * @param key
 * @return {Promise<void>}
 */
async function fetchData(apiEndpoint, params, watch, key = "lists") {
    if (import.meta.env.MODE === 'development')
        console.time('fetchData')

    const {data, pending, error, refresh} = await useAsyncData(
        key,
        () => $fetch(import.meta.env.VITE_APP_BASE_HOST + apiEndpoint, {
            params
        }), {watch, initialCache: false}
    )
    const code = data.value?.code || error.value?.statusCode || 200

    if (import.meta.env.MODE === 'development') {
        console.group(`🚀 fetchData.js 发起了请求：'${apiEndpoint}', code =`, code)
        console.log("📥请求参数：", params)
        console.timeEnd('fetchData')
        console.log("🔙返回数据：")
        console.log(data.value)
        if (data.value?.rows)
            console.table(data.value.rows)
        console.groupEnd()
    }


    switch (code) {
        case 200:
            break
        case 401:
            showError({
                statusCode: 401,
                statusMessage: "这个页面没有权限访问🔒"
            })
            break
        case 500:
            showError({
                statusCode: 404,
                statusMessage: "页面找不到了❓🔍"
            })
            throw new Error(error.value);
        default:
            showError()
            break;
    }

    return {
        data,
        pending,
        error,
        refresh
    }
}

export default fetchData;
