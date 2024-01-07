<template>
  <default>
    <template v-slot:custom>
      <main class="m-auto flex flex-col h-[80vh] items-center justify-center">
        <div class="text-8xl font-extrabold">404</div>
        <div>页面不见了</div>
        <button class="btn btn-active btn-link" @click="handleError">返回首页</button>
      </main>
    </template>
  </default>
</template>
<script setup lang="ts">
import Default from "~/layouts/default.vue";

const props = defineProps({
  error: Object
})
const handleError = () => clearError({ redirect: '/' })
</script>
