<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
  <div class="content-runtime">
    测试
    <slot />
    <button @click="count++">
      count is: {{ count }}
    </button>
  </div>
</template>
