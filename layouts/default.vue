<template>
  <div data-theme="light" class="h-[100vh] bg-base-200 relative
 ">
    <header>
      <div class="navbar bg-base-100 border-b-2" :class="{'': !isMobile}">
        <div class="navbar" :class="{'w-8/12': !isMobile}">
          <div class="flex-1">
            <a href="#" class="btn btn-ghost text-xl">jidonghao</a>
          </div>
          <div class="flex-none">
            <button class="btn btn-square btn-ghost" @click="toggleMobileMenu" v-show="isMobile">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                   class="inline-block w-5 h-5 stroke-current">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
            <ul class="menu menu-dropdown" :class="{'menu-horizontal': !isMobile}" v-show="!isMobile || mobileMenuOpen">
              <li><a @click="navigateTo('关于')">关于</a></li>
              <li><a @click="navigateTo('联系')">联系</a></li>
              <li><a @click="navigateTo('列表')">列表</a></li>
            </ul>
          </div>
        </div>
      </div>
    </header>

    <main :class="{'w-8/12': !isMobile}" class="m-auto min-h-[50vh] bg-base-100 px-10 pt-2 flex">
      <!-- Main content goes here -->
      <NuxtPage :class="{'w-4/5':!isMobile}"/>
      <aside class="w-1/5 ml-2" :class="{'hidden':isMobile}">
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

    const navigateTo = (page) => {
      // 在这里实现页面导航逻辑
      console.log(`跳转到${page}页面`);
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
      navigateTo,
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
