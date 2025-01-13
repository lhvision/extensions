<script setup lang="ts">
import { useBookmarksStore } from '@stores/bookmarks'
import { storeToRefs } from 'pinia'
import BookmarksItem from './BookmarksItem.vue'

const bookmarksStore = useBookmarksStore()

const { bookmarkTreeNodes } = storeToRefs(bookmarksStore)
</script>

<template>
  <BookmarksItem v-model="bookmarkTreeNodes" />
</template>
