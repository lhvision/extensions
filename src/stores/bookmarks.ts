import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface BookmarkTreeNode extends Omit<chrome.bookmarks.BookmarkTreeNode, 'children'> {
  faviconUrl?: string
  children?: BookmarkTreeNode[] | undefined
}

const checkBookmarksBarText = '书签栏'

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

    if (node.children)
      processBookmarkTreeNodes(node.children)
  }
}

async function getBookmarksTree(size = 32) {
  try {
    const bookmarkTreeNodes = (
      (await chrome.bookmarks.getTree()) as BookmarkTreeNode[]
    )?.[0].children?.filter(v => v.title === checkBookmarksBarText)[0]
      .children
    const quickBookmarks = bookmarkTreeNodes?.filter(
      node => !node.dateGroupModified,
    )
    const newbookmarkTreeNodes
      = bookmarkTreeNodes?.filter(node => node.dateGroupModified) || []
    processBookmarkTreeNodes(newbookmarkTreeNodes, size)
    if (quickBookmarks?.length) {
      const quickBookmarkInfo = {
        ...quickBookmarks[0],
        title: '快捷书签',
        children: quickBookmarks?.map(item => ({
          ...item,
          faviconUrl: item.url ? getFaviconUrl(item.url, size) : '',
        })),
      }
      Reflect.deleteProperty(quickBookmarkInfo, 'url')
      newbookmarkTreeNodes?.unshift(quickBookmarkInfo)
    }
    return newbookmarkTreeNodes
  }
  catch (error) {
    console.error('Error getting bookmarks tree:', error)
  }
  return []
}

export const useBookmarksStore = defineStore('bookmarks', () => {
  const bookmarkTreeNodes = ref<BookmarkTreeNode[]>()

  const initBookmarksTree = async () => {
    bookmarkTreeNodes.value = await getBookmarksTree()
  }

  const remove = async (id: string) => {
    try {
      await chrome.bookmarks.remove(id)
    }
    catch (error) {
      console.error('Error removing bookmark:', error)
    }
  }

  return {
    bookmarkTreeNodes,
    initBookmarksTree,
    remove,
  }
})
