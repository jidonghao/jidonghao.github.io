<script setup>
import {ref, watch} from 'vue'
// 获取页面query
const router = useRouter()
const route = useRoute()
let _page = route.query.page

const page = ref(1)
const pageSize = ref(20)

if (_page) {
  page.value = Number(_page)
}

import {useBlogList} from '~/api/asyncApi/blog'

const list = ref([])
const total = ref(0)

/**
 * 页面水合前获取列表
 * @return {Promise<void>}
 */
async function getList() {
  const {data: {value: {rows = [], total: _total}}} = await useBlogList({
    pageNum: page.value,
    pageSize: pageSize.value
  }, null)

  if (page.value > Math.ceil(_total / pageSize.value)) {
    page.value = Math.ceil(_total / pageSize.value)
  }

  list.value = rows
  total.value = _total
}

/**
 * 切换页面
 * @param i
 * @return {Promise<void>}
 */
function changePage(i) {
  if (i < 0 && page.value === 1) return;

  if (i > 0 && page.value === Math.ceil(total / pageSize.value)) return;
  page.value += i;
  navigateTo({path: `/`, query: {page: page.value}, forceReload: true})
  getList()
}

await getList()
</script>

<template>
  <div>
    <div v-for="v in list" :key="v.id"
         class="px-4 py-2 my-2 hover:bg-slate-50 active:bg-slate-100 transition blog-item rounded-md cursor-pointer select-none">
      <NuxtLink :to="`/hown/${v.id}`">
        <div class="flex">
          <h2 class="pr-2">{{ v.title }}</h2>
          <em>{{ v.createdAt }}</em>
        </div>
        <p>{{ v.description }}</p>
      </NuxtLink>
    </div>

    <div class="w-full flex justify-end items-center" v-if="total">
      共{{ total }}条
      <div class="join ml-4">
        <button class="join-item btn btn-sm" @click="changePage(-1)">«</button>
        <button class="join-item btn btn-sm">{{ page }}/{{ Math.ceil(total / pageSize) }}</button>
        <button class="join-item btn btn-sm" @click="changePage(1)">»</button>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.blog-item {
  //padding: 1rem 2rem;
}
</style>
