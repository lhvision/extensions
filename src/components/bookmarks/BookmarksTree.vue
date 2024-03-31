<script setup lang="ts">
import { ref } from 'vue'
import { useBookmarksTree } from '../../hooks/useBookmarksTree'
import BookmarksItem from './BookmarksItem.vue'

const bookmarksTree = await useBookmarksTree()

const activeTab = ref(bookmarksTree?.[0].dateGroupModified)
</script>

<template>
  <div v-for="item in bookmarksTree" :key="item.dateGroupModified" class="flex">
    <div @click="activeTab = item.dateGroupModified">
      {{ item.title }}
    </div>
    <div v-show="activeTab === item.dateGroupModified" class="flex items-start">
      <BookmarksItem v-model="item.children" />
    </div>
  </div>
</template>
