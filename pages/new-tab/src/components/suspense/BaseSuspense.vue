<script setup lang="ts">
import Loading from './Loading.vue'

// const props = defineProps<{
//   tips?: string,
// }>()
</script>

<template>
  <Suspense>
    <!-- 具有深层异步依赖的组件 -->
    <slot />

    <!-- 在 #fallback 插槽中显示 “正在加载中” -->
    <template #fallback>
      <Loading />
    </template>
  </Suspense>
</template>
