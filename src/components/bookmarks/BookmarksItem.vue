<script setup lang="ts">
import type { BookmarkTreeNode } from '@stores/bookmarks'

const bookmarksTree = defineModel<BookmarkTreeNode[]>()

function onOpen(url?: string) {
  if (!url)
    return
  window.open(url)
}
</script>

<template>
  <div
    v-for="item of bookmarksTree"
    :key="item.dateAdded"
    class="cursor-pointer flex items-center flex-col ml-4 gap-y-2"
    @click="onOpen(item.url)"
  >
    <img
      v-if="item.faviconUrl"
      :src="item.faviconUrl"
      class="logo vue"
      :alt="`${item.title} logo`"
    >
    <span
      class="text-ellipsis overflow-hidden whitespace-nowrap w16 inline-block"
    >
      {{ item.title }}
    </span>
    <BookmarksItem v-model="item.children" />
  </div>
</template>
