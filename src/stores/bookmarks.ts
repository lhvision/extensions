import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface BookmarkTreeNode extends Omit<chrome.bookmarks.BookmarkTreeNode, 'children'> {
  faviconUrl?: string
  children?: BookmarkTreeNode[] | undefined
}

function getFaviconUrl(u: string, size = 32) {
  const url = new URL(chrome.runtime.getURL('/_favicon/'))
  url.searchParams.set('pageUrl', u) // this encodes the URL as well
  url.searchParams.set('size', `${size}`)
  // chrome-extension://EXTENSION_ID/_favicon/?pageUrl=https%3A%2F%2Fwww.google.com&size=32
  return url.toString()
}

function processBookmarkTreeNodes(bookmarkTreeNodes: BookmarkTreeNode[], size = 32) {
  for (const node of bookmarkTreeNodes) {
    if (node.url)
      node.faviconUrl = getFaviconUrl(node.url, size)

    if (node.children) {
      node.children = node.children.sort((a, b) => {
        // 按照 children 数量从低到高排序
        if (a.children && !b.children)
          return 1

        if (!a.children && b.children)
          return -1

        if (a.children && b.children) {
          if (a.children.length - b.children.length < 0)
            return -1
        }
        return 0
      })
      processBookmarkTreeNodes(node.children)
    }
  }
}

async function getBookmarksTree(size = 32) {
  try {
    const bookmarkTreeNodes = await chrome.bookmarks.getTree()
    processBookmarkTreeNodes(bookmarkTreeNodes, size)
    return bookmarkTreeNodes[0]?.children || []
  }
  catch (error) {
    console.error('Error getting bookmarks tree:', error)
  }
  return []
}

export const useBookmarksStore = defineStore('bookmarks', () => {
  const bookmarkTreeNodes = ref<BookmarkTreeNode[]>()

  async function initBookmarksTree() {
    bookmarkTreeNodes.value = await getBookmarksTree()
  };

  return {
    bookmarkTreeNodes,
    initBookmarksTree,
  }
})
