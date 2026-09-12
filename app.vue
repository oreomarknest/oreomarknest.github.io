<template>
  <div class="site-frame" @touchstart.capture="onTouchStart" @touchend.capture="onTouchEnd" @touchcancel.capture="resetSwipe">
    <SiteHeader />
    <NuxtPage />
    <SiteFooter v-if="route.path !== '/'" />
  </div>
</template>

<script setup lang="ts">
const { locale, t } = useLocale()
const route = useRoute()
const router = useRouter()

type SwipeStart = {
  x: number
  y: number
}

let swipeStart: SwipeStart | null = null

function isSwipeExcluded(target: EventTarget | null) {
  return target instanceof Element && Boolean(target.closest(
    'a, button, input, textarea, select, [role="dialog"], .showcase-swiper'
  ))
}

function onTouchStart(event: TouchEvent) {
  if (!window.matchMedia('(max-width: 900px)').matches || event.touches.length !== 1 || isSwipeExcluded(event.target)) {
    resetSwipe()
    return
  }

  const touch = event.touches[0]
  swipeStart = { x: touch.clientX, y: touch.clientY }
}

function onTouchEnd(event: TouchEvent) {
  if (!swipeStart || event.changedTouches.length !== 1) {
    resetSwipe()
    return
  }

  const touch = event.changedTouches[0]
  const deltaX = touch.clientX - swipeStart.x
  const deltaY = touch.clientY - swipeStart.y
  resetSwipe()

  if (Math.abs(deltaX) < 72 || Math.abs(deltaX) <= Math.abs(deltaY) * 1.25) return
  if (route.path === '/' && deltaX < 0) router.push('/install')
  else if (route.path === '/install' && deltaX > 0) router.push('/')
}

function resetSwipe() {
  swipeStart = null
}

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
