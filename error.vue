<template>
  <default>
    <template v-slot:custom>
      <main class="grid min-h-full place-items-center sm:py-24 lg:px-4">
        <div class="text-center">
          <p class="text-base font-semibold text-indigo-600">{{ props.error.statusCode || '404' }}</p>
          <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">页面不见了</h1>
          <p class="mt-6 text-base leading-7 text-gray-600">{{ messageHandle() }}</p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <a href="/"
               class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
               @click="handleError">返回首页</a>
            <!--            <a href="#" class="text-sm font-semibold text-gray-900">Contact support <span aria-hidden="true">&rarr;</span></a>-->
          </div>
        </div>
      </main>
    </template>
  </default>
</template>
<script setup lang="ts">
import Default from "~/layouts/default.vue";

const props = defineProps({
  error: {
    type: Object,
    required: true
  }
})

function messageHandle(): string{
  const {message} = props.error
  if (message.indexOf("Page not found") > -1) {
    return '找不到这个页面了'
  }
  return props.error.message
}

console.error("页面有错误拉~", props.error)
const handleError = () => clearError({redirect: '/'})
</script>
