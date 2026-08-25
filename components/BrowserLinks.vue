<template>
  <div class="browser-links" :aria-label="t('browsers')">
    <a
      href="https://chromewebstore.google.com/detail/marknest-%E6%9C%AC%E5%9C%B0-markdown-%E9%98%85%E8%AF%BB%E4%B8%8E%E7%BC%96/lgedmhgnblklbdehjhhcgiflmpdeeiig?authuser=0&hl=zh-CN"
      target="_blank"
      rel="noreferrer"
      aria-label="Chrome"
    ><span class="i-logos-chrome" /></a>
    <a
      href="https://microsoftedge.microsoft.com/addons/detail/marknest-%E6%9C%AC%E5%9C%B0-markdown-%E9%98%85%E8%AF%BB/kojaliplnmgbfmkdgnhbifpjpfcgjobd"
      target="_blank"
      rel="noreferrer"
      aria-label="Microsoft Edge"
    ><span class="i-logos-microsoft-edge" /></a>
    <a
      href="https://addons.mozilla.org/zh-CN/firefox/addon/marknest-%E6%9C%AC%E5%9C%B0-markdown-%E9%98%85%E8%AF%BB%E4%B8%8E%E7%BC%96%E8%BE%91%E5%99%A8/"
      target="_blank"
      rel="noreferrer"
      aria-label="Firefox"
    ><span class="i-logos-firefox" /></a>
  </div>
</template>

<script setup lang="ts">
const { t } = useLocale()
</script>
