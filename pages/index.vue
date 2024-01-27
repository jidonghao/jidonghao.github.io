<script setup>
// 获取页面query
const router = useRouter()
const route = useRoute()
console.log(route.query.page)

const page = ref(1)
const pageSize = ref(20)

import {useBlogList} from '~/api/asyncApi/blog'

const {data: {value: {rows = [], total}},refresh} = await useBlogList({pageNum: page.value, pageSize: pageSize.value}, [page])

function changePage(i) {
  if (i < 0 && page.value === 1) return;
  if (i > 0 && page.value === Math.ceil(total / pageSize.value)) return;
  page.value += i;
  refresh()

  // 页面跳转
  // router.push({path: ``, query: {page: page.value}})
}
</script>

<template>
  <div>
    <div v-for="v in rows" :key="v.id"
         class="px-4 py-2 my-2 hover:bg-slate-50 active:bg-slate-100 transition blog-item rounded-md cursor-pointer select-none">
      <div class="flex">
        <h2 class="pr-2">{{ v.title }}</h2>
        <em>{{ v.createdAt }}</em>
      </div>
      <p>{{ v.description }}</p>
    </div>

    <div class="w-full flex justify-end items-center">
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
