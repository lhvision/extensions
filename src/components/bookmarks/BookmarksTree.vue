<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useBookmarksStore } from '@stores/bookmarks'
import BookmarksItem from './BookmarksItem.vue'

const bookmarksStore = useBookmarksStore()

const { bookmarkTreeNodes } = storeToRefs(bookmarksStore)

const activeTab = ref<number>()

watch(
  bookmarkTreeNodes,
  (newValue) => {
    if (newValue?.length)
      activeTab.value = newValue[0].dateGroupModified
  },
  { once: true },
)
</script>

<template>
  <div v-for="item in bookmarkTreeNodes" :key="item.dateGroupModified" class="flex">
    <div @click="activeTab = item.dateGroupModified">
      {{ item.title }}
    </div>
    <div v-show="activeTab === item.dateGroupModified" class="flex items-start">
      <BookmarksItem v-model="item.children" />
    </div>
  </div>
</template>
