<template>
  <div data-theme="light" class="h-[100vh] bg-base-200 relative
 ">
    <header>
      <div class="bg-base-100 border-b-2 p-0" :class="{'': !isMobile}">
        <div class="navbar p-0" :class="{'w-8/12': !isMobile}">
          <div class="flex-1">
            <a href="/" class="btn btn-ghost text-xl py-0">Hown</a>
          </div>
          <div class="flex-none">
            <button class="btn btn-square btn-ghost" @click="toggleMobileMenu" v-show="isMobile">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                   class="inline-block w-5 h-5 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
            <ul class="menu menu-dropdown py-0" :class="{'menu-horizontal': !isMobile}"
                v-show="!isMobile || mobileMenuOpen">
              <li><a href="/about">关于</a></li>
              <li><a href="/contact">联系</a></li>
              <li><a href="/list">列表</a></li>
            </ul>
          </div>
        </div>
      </div>
    </header>


    <main class="m-auto flex justify-center" :class="{'w-8/12': !isMobile,'flex-col':isMobile}">
      <!-- Main content goes here -->
      <div class="bg-base-100 px-2" :class="{'w-4/5 px-10 min-h-[50vh]':!isMobile, ' min-h-[30vh]':isMobile}">
<!--        <div class="text-sm breadcrumbs">-->
<!--          <ul>-->
<!--            <li><a class="btn btn-xs">Home</a></li>-->
<!--          </ul>-->
<!--        </div>-->
        <NuxtPage/>
      </div>

      <aside class="w-1/5 pt-2 bg-base-100 px-2" :class="{'ml-0 mt-2 w-[100%]':isMobile, 'ml-2': !isMobile}">
        侧边栏
      </aside>
    </main>

    <footer class="footer p-10 bg-base-100 text-base-content">
      <aside class="m-auto" :class="{'w-8/12': !isMobile}">
        <p>Copyright © 2023 - All right reserved by ACME Industries Ltd</p>
      </aside>
    </footer>
  </div>
</template>

<script>
import {ref, onMounted, onBeforeUnmount} from 'vue';

export default {
  setup() {
    const isMobile = ref(false);
    const mobileMenuOpen = ref(false);

    const toggleMobileMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value;
    };

    const checkMobile = () => {
      isMobile.value = window.innerWidth <= 768;
    };

    onMounted(() => {
      checkMobile();
      window.addEventListener('resize', checkMobile);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', checkMobile);
    });

    return {
      isMobile,
      mobileMenuOpen,
      toggleMobileMenu,
    };
  },
};
</script>

<style scoped>
.menu-dropdown {
  @media (max-width: 768px) {
    position: absolute;
    top: 60px; /* 调整菜单位置 */
    left: 0;
    width: 100%;
    background-color: white; /* 设置背景颜色 */
    padding: 10px; /* 设置内边距 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
  }
}

.navbar {
  margin: 0 auto;
}

.footer {
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
