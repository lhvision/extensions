<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBookmarksStore } from '@stores/bookmarks'
import BookmarksItem from './BookmarksItem.vue'

const bookmarksStore = useBookmarksStore()

const { bookmarkTreeNodes } = storeToRefs(bookmarksStore)
</script>

<template>
  <BookmarksItem v-model="bookmarkTreeNodes" />
</template>
