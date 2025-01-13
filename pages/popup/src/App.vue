<script setup lang="ts">
const notificationOptions = {
  type: 'basic',
  iconUrl: chrome.runtime.getURL('icon-34.png'),
  title: 'Injecting content script error',
  message: 'You cannot inject script here!',
} as const

async function injectContentScript() {
  const [tab] = await chrome.tabs.query({ currentWindow: true, active: true })

  if (tab.url!.startsWith('about:') || tab.url!.startsWith('chrome:')) {
    chrome.notifications.create('inject-error', notificationOptions)
  }

  await chrome.scripting
    .executeScript({
      target: { tabId: tab.id! },
      files: ['/content-runtime/index.iife.js'],
    })
    .catch((err) => {
      // Handling errors related to other paths
      if (err.message.includes('Cannot access a chrome:// URL')) {
        chrome.notifications.create('inject-error', notificationOptions)
      }
    })
}
</script>

<template>
  <button @click="injectContentScript">
    点击注入 content runtime 页面
  </button>
</template>
