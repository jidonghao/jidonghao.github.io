<template>
  <article :id="i" class="prose" v-html="content"/>
</template>

<script setup>
import { useBlogDetail } from "~/api/asyncApi/blog.js"
const route = useRoute()
const {id} = route.params
import Prism from 'prismjs'

const title = ref("")
const content = ref("")
const createdAt = ref("")
const updatedAt = ref("")

/**
 * 页面水合前获取列表
 * @return {Promise<void>}
 */
async function getList() {
  const {data: {value: {data}}} = await useBlogDetail(id, id)
  console.log(data)
  // TODO: 替换其中的内容
  let contentHtml = data.contentHtml||""
  title.value = data.title
  // 替换h标签
  console.log(contentHtml)
//
  if(!contentHtml)return;
  // 处理标题
  contentHtml = contentHtml
      .replaceAll("<h1>",`<h1 id='${title.value}' class='text-3xl mt-4 mb-2'>`)
      .replaceAll("</h1>","</h1><hr class='mb-3'>")
      .replaceAll("<h2>",`<h2 class='text-2xl mt-4 mb-1'>`)
      .replaceAll("</h2>","</h2><hr class='mb-2'>")
      .replaceAll("<h3>",`<h3 class='text-xl mt-3'>`)

  // 处理代码
  // contentHtml = contentHtml
  //     .replaceAll("<pre class=\"","<pre class=\"mockup-code ")

  content.value = contentHtml

  nextTick(()=>{
    Prism.highlightAll()
    document.querySelectorAll()
  })
}

await getList()

</script>

<style >

</style>
