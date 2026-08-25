<template>
  <div class="site-frame">
    <SiteHeader />
    <NuxtPage />
    <SiteFooter v-if="route.path !== '/'" />
  </div>
</template>

<script setup lang="ts">
const { locale, t } = useLocale()
const route = useRoute()

useHead(() => ({
  htmlAttrs: { lang: locale.value === 'zh' ? 'zh-CN' : locale.value === 'ja' ? 'ja-JP' : 'en' },
  title: t('pageTitle'),
  meta: [
    { name: 'description', content: t('pageDescription') },
    { property: 'og:title', content: t('pageTitle') },
    { property: 'og:description', content: t('pageOgDescription') }
  ]
}))
</script>
