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
    :key="`${item.parentId}_${item.id}`"
    cursor-pointer
    gap-y-2
    class="flex-center flex-col"
    :title="item.title"
    @click="onOpen(item.url)"
  >
    <img
      v-if="item.faviconUrl"
      :src="item.faviconUrl"
      :alt="`${item.title} logo`"
    >
    <span
      class="inline-block max-w16 w-min text-ellipsis-nowrap"
    >
      {{ item.title }}
    </span>
    <BookmarksItem v-model="item.children" />
  </div>
</template>
