import { useBookmarksStore } from '@stores/bookmarks'
import { onMounted } from 'vue'

export function useWatchBookmarks() {
  const bookmarksStore = useBookmarksStore()

  const initBookmarksTree = bookmarksStore.initBookmarksTree

  onMounted(() => {
    initBookmarksTree()
    chrome.bookmarks.onChanged.addListener(initBookmarksTree)
    chrome.bookmarks.onRemoved.addListener(initBookmarksTree)
  })
}
