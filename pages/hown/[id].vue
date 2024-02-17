<template>
  <article v-highlight class="prose">
    <main v-html="content"/>
    <div class="mt-6 flex items-center justify-end">
      <Clock size="16" class="mr-1"/>{{createdAt}}
<!--      {{updatedAt}}-->
    </div>
  </article>
</template>

<script setup>
import LinkIcon from "/assets/image/link.svg"
import 'highlight.js/styles/atom-one-dark.css'
import {useBlogDetail} from "~/api/asyncApi/blog.js"
import Clock from "assets/image/clock.vue";

const route = useRoute()
const {id} = route.params

const title = ref("")
const content = ref("")
const createdAt = ref("")
const updatedAt = ref("")

const anchors = (href, showText = '#') =>`<a href="#${href}" aria-hidden="true" tabindex="-1">
<span class="mr-1 opacity-20 hover:opacity-60 text-base font-bold inline-block align-middle relative -mt-1">${showText}</span></a>`

/**
 * 页面水合前获取列表
 * @return {Promise<void>}
 */
async function getList() {
  const {data: {value: {data}}} = await useBlogDetail(id, id)
  // TODO: 替换其中的内容
  let contentHtml = data.contentHtml || ""
  title.value = data.title
  createdAt.value = data.createdAt
  updatedAt.value = data.updatedAt
//
  if (!contentHtml) return;

  contentHtml = contentHtml
      .replaceAll("<a", `<a class='link flex'`)
      .replaceAll("</a>", `<img class="ml-1" src="${LinkIcon}" alt="表示外部链接的图标"></a>`)

  // 处理标题
  contentHtml = contentHtml
      .replaceAll("<h1>", `<h1 id='${title.value}' class='text-3xl mt-4 mb-2 flex'>${anchors(title.value)}`)
      .replaceAll("</h1>", "</h1><hr class='mb-3 flex'>")
      .replaceAll("<h2>", `<h2 class='text-2xl mt-4 mb-1 flex'>`)
      .replaceAll("</h2>", "</h2><hr class='mb-2 flex'>")
      .replaceAll("<h3>", `<h3 class='text-xl mt-3 flex'>`)

  content.value = contentHtml
}

await getList()

</script>

<style lang="scss">
h1,h2,h3{
  scroll-margin-top: 100px;
}
</style>
