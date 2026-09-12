<template>
  <header class="site-header">
    <div class="page-shell header-inner">
      <NuxtLink class="brand" to="/" aria-label="MarkNest">
        <BrandLogo />
        <span>MarkNest</span>
      </NuxtLink>

      <nav class="main-nav" :aria-label="t('primaryNavigation')">
        <NuxtLink to="/">{{ t('home') }}</NuxtLink>
        <NuxtLink to="/install">{{ t('install') }}</NuxtLink>
      </nav>

      <div class="header-actions">
        <div ref="languageMenu" class="language-menu">
          <button class="icon-button" type="button" :title="t('language')" :aria-label="t('language')" aria-haspopup="menu" :aria-expanded="languageOpen" @click="languageOpen = !languageOpen">
            <span class="i-lucide-languages text-[19px]" />
          </button>
          <div v-if="languageOpen" class="language-popover" role="menu">
            <button v-for="item in localeOptions" :key="item.value" type="button" role="menuitem" :class="{ active: locale === item.value }" @click="setLocale(item.value)">
              <span>{{ item.label }}</span><small>{{ item.short }}</small>
            </button>
          </div>
        </div>
        <button ref="themeButton" class="icon-button" type="button" :title="t('theme')" :aria-label="t('theme')" :disabled="themeTransitioning" @click="toggleTheme">
          <ClientOnly>
            <span v-if="colorMode.value === 'dark'" class="i-lucide-moon-star text-[19px]" />
            <span v-else class="i-lucide-sun text-[19px]" />
            <template #fallback><span class="i-lucide-sun text-[19px]" /></template>
          </ClientOnly>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { Locale } from '~/composables/useLocale'

const { locale, t } = useLocale()
const colorMode = useColorMode()
const languageMenu = ref<HTMLElement | null>(null)
const themeButton = ref<HTMLButtonElement | null>(null)
const languageOpen = ref(false)
const themeTransitioning = ref(false)
const localeOptions: { value: Locale, label: string, short: string }[] = [
  { value: 'zh', label: '简体中文', short: '中' },
  { value: 'en', label: 'English', short: 'EN' },
  { value: 'ja', label: '日本語', short: '日' }
]

function setLocale(value: Locale) {
  locale.value = value
  languageOpen.value = false
}

async function toggleTheme() {
  if (themeTransitioning.value) return
  const target = colorMode.value === 'dark' ? 'light' : 'dark'
  const transitionDocument = document as Document & {
    startViewTransition?: (callback: () => Promise<void>) => {
      ready: Promise<void>
      finished: Promise<void>
    }
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !transitionDocument.startViewTransition) {
    colorMode.preference = target
    return
  }

  const bounds = themeButton.value?.getBoundingClientRect()
  const x = bounds ? bounds.left + bounds.width / 2 : window.innerWidth - 28
  const y = bounds ? bounds.top + bounds.height / 2 : 28
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
  themeTransitioning.value = true

  const transition = transitionDocument.startViewTransition(async () => {
    colorMode.preference = target
    await nextTick()
  })

  try {
    await transition.ready
    document.documentElement.animate(
      {
        clipPath: [`circle(${radius}px at ${x}px ${y}px)`, `circle(0px at ${x}px ${y}px)`]
      },
      {
        duration: 430,
        easing: 'cubic-bezier(.4, 0, .2, 1)',
        fill: 'both',
        pseudoElement: '::view-transition-old(root)'
      } as KeyframeAnimationOptions
    )
    await transition.finished
  } finally {
    themeTransitioning.value = false
  }
}

function closeLanguageMenu(event: PointerEvent) {
  if (!languageOpen.value || languageMenu.value?.contains(event.target as Node)) return
  languageOpen.value = false
}

function closeLanguageMenuOnEscape(event: KeyboardEvent) {
  if (event.key === 'Escape') languageOpen.value = false
}

onMounted(() => {
  document.addEventListener('pointerdown', closeLanguageMenu)
  document.addEventListener('keydown', closeLanguageMenuOnEscape)
})

onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', closeLanguageMenu)
  document.removeEventListener('keydown', closeLanguageMenuOnEscape)
})
</script>
