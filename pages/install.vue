<template>
  <main class="install-page">
    <section class="install-hero page-shell">
      <p class="eyebrow"><span />MarkNest 3.0</p>
      <div class="install-title-stage" :class="{ 'is-rendered': installHeroRendered }" aria-live="polite">
        <div class="install-markdown" aria-hidden="true"><b>#</b>{{ installTyped }}<i class="hero-markdown__cursor" /></div>
        <h1>{{ t('installTitle') }}</h1>
      </div>
      <p>{{ t('installText') }}</p>
    </section>

    <section class="page-shell browser-grid" :aria-label="t('browserDownloads')">
      <a
        v-for="browser in browsers"
        :id="browser.id"
        :key="browser.id"
        :href="browser.url"
        target="_blank"
        rel="noreferrer"
        class="browser-card"
        :class="`browser-card--${browser.id}`"
        data-reveal
      >
        <span class="browser-card__content">
          <span class="browser-card__name">{{ browser.name }}</span>
          <span class="browser-card__description">{{ t(browser.description) }}</span>
        </span>
        <span class="browser-install-button">
          {{ t(browser.action) }} <span class="i-lucide-chevrons-right" aria-hidden="true" />
        </span>
        <span class="browser-logo" aria-hidden="true"><span :class="browser.icon" /></span>
      </a>
    </section>

    <section class="page-shell install-guide" data-reveal>
      <div>
        <p class="feature-kicker">README</p>
        <h2>{{ t('installGuide') }}</h2>
        <aside class="file-access-note" :aria-label="t('permissionTitle')">
          <p class="file-access-note__eyebrow">{{ t('permissionEyebrow') }}</p>
          <h3>{{ t('permissionTitle') }}</h3>
          <p>{{ t('permissionSummary') }}</p>
        </aside>
      </div>
      <ol>
        <li v-for="(step, index) in installSteps" :key="step"><span>{{ String(index + 1).padStart(2, '0') }}</span><p>{{ t(step) }}</p></li>
      </ol>
    </section>
  </main>
</template>

<script setup lang="ts">
const { locale, t } = useLocale()
useReveal()

const installHeroRendered = ref(false)
const installTyped = ref('')
let animationToken = 0
const wait = (duration: number) => new Promise(resolve => setTimeout(resolve, duration))

async function playInstallTransformation() {
  const token = ++animationToken
  installHeroRendered.value = false
  installTyped.value = ''

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    installTyped.value = t('installTitle')
    installHeroRendered.value = true
    return
  }

  await wait(180)
  for (const character of t('installTitle')) {
    if (token !== animationToken) return
    installTyped.value += character
    await wait(30)
  }
  await wait(520)
  if (token === animationToken) installHeroRendered.value = true
}

onMounted(playInstallTransformation)
watch(locale, () => playInstallTransformation())
onBeforeUnmount(() => { animationToken += 1 })

const installSteps = ['step1', 'step2', 'step3']
const browsers = [
  {
    id: 'chrome',
    name: 'Google Chrome',
    icon: 'i-logos-chrome',
    description: 'chromeDesc',
    action: 'getChrome',
    url: 'https://chromewebstore.google.com/detail/marknest-%E6%9C%AC%E5%9C%B0-markdown-%E9%98%85%E8%AF%BB%E4%B8%8E%E7%BC%96/lgedmhgnblklbdehjhhcgiflmpdeeiig?authuser=0&hl=zh-CN'
  },
  {
    id: 'edge',
    name: 'Microsoft Edge',
    icon: 'i-logos-microsoft-edge',
    description: 'edgeDesc',
    action: 'getEdge',
    url: 'https://microsoftedge.microsoft.com/addons/detail/marknest-%E6%9C%AC%E5%9C%B0-markdown-%E9%98%85%E8%AF%BB/kojaliplnmgbfmkdgnhbifpjpfcgjobd'
  },
  {
    id: 'firefox',
    name: 'Mozilla Firefox',
    icon: 'i-logos-firefox',
    description: 'firefoxDesc',
    action: 'getFirefox',
    url: 'https://addons.mozilla.org/zh-CN/firefox/addon/marknest-%E6%9C%AC%E5%9C%B0-markdown-%E9%98%85%E8%AF%BB%E4%B8%8E%E7%BC%96%E8%BE%91%E5%99%A8/'
  }
]
</script>
