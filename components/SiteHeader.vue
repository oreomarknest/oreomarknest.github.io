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
        <button ref="themeButton" class="icon-button" type="button" :title="t('theme')" :aria-label="t('theme')" :disabled="themeTransition.active" @click="toggleTheme">
          <ClientOnly>
            <span v-if="colorMode.value === 'dark'" class="i-lucide-moon-star text-[19px]" />
            <span v-else class="i-lucide-sun text-[19px]" />
            <template #fallback><span class="i-lucide-sun text-[19px]" /></template>
          </ClientOnly>
        </button>
      </div>
    </div>
  </header>

  <Teleport to="body">
    <div
      v-if="themeTransition.active"
      class="theme-transition-overlay"
      :class="`theme-transition-overlay--${themeTransition.target}`"
      :style="{ '--theme-origin-x': `${themeTransition.x}px`, '--theme-origin-y': `${themeTransition.y}px` }"
      aria-hidden="true"
    />
  </Teleport>
</template>

<script setup lang="ts">
import type { Locale } from '~/composables/useLocale'

const { locale, t } = useLocale()
const colorMode = useColorMode()
const languageMenu = ref<HTMLElement | null>(null)
const themeButton = ref<HTMLButtonElement | null>(null)
const languageOpen = ref(false)
const themeTransition = reactive({
  active: false,
  target: 'dark' as 'light' | 'dark',
  x: 0,
  y: 0
})
let themeSwapTimer: ReturnType<typeof setTimeout> | undefined
let themeFinishTimer: ReturnType<typeof setTimeout> | undefined
const localeOptions: { value: Locale, label: string, short: string }[] = [
  { value: 'zh', label: '简体中文', short: '中' },
  { value: 'en', label: 'English', short: 'EN' },
  { value: 'ja', label: '日本語', short: '日' }
]

function setLocale(value: Locale) {
  locale.value = value
  languageOpen.value = false
}

function toggleTheme() {
  if (themeTransition.active) return

  const target = colorMode.value === 'dark' ? 'light' : 'dark'
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    colorMode.preference = target
    return
  }

  const bounds = themeButton.value?.getBoundingClientRect()
  themeTransition.target = target
  themeTransition.x = bounds ? bounds.left + bounds.width / 2 : window.innerWidth - 28
  themeTransition.y = bounds ? bounds.top + bounds.height / 2 : 28
  themeTransition.active = true

  themeSwapTimer = setTimeout(() => {
    colorMode.preference = target
  }, 300)
  themeFinishTimer = setTimeout(() => {
    themeTransition.active = false
  }, 920)
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
  clearTimeout(themeSwapTimer)
  clearTimeout(themeFinishTimer)
  document.removeEventListener('pointerdown', closeLanguageMenu)
  document.removeEventListener('keydown', closeLanguageMenuOnEscape)
})
</script>
