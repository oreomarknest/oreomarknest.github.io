<template>
  <main class="home-page">
    <Swiper
      class="home-swiper"
      direction="vertical"
      :modules="swiperModules"
      :speed="850"
      :resistance-ratio="0"
      :mousewheel="mousewheelOptions"
      :keyboard="{ enabled: true }"
      :pagination="{ clickable: true }"
      @swiper="onSwiper"
    >
      <SwiperSlide tag="section" class="hero page-shell">
        <div class="hero-glow hero-glow--one" />
        <div class="hero-glow hero-glow--two" />
        <div class="hero-content">
          <p class="eyebrow"><span />{{ t('eyebrow') }}</p>
          <div class="hero-title-stage" :class="{ 'is-rendered': heroRendered }" aria-live="polite">
            <div class="hero-markdown" aria-hidden="true">
              <span class="hero-markdown__line"><b>#</b>{{ typedLines[0] }}<i v-if="!typedSource.includes('\n')" class="hero-markdown__cursor" /></span>
              <span class="hero-markdown__line"><b>##</b>{{ typedLines[1] }}<i v-if="typedSource.includes('\n')" class="hero-markdown__cursor" /></span>
            </div>
            <h1>{{ t('heroTitleA') }}<br><span>{{ t('heroTitleB') }}</span></h1>
          </div>
          <p class="hero-copy">{{ t('heroText') }}</p>
          <div class="hero-actions">
            <NuxtLink class="primary-cta" to="/install"><span>{{ t('installNow') }}</span><i class="i-lucide-arrow-up-right" /></NuxtLink>
            <BrowserLinks />
          </div>
          <div class="trust-row">
            <span><i class="i-lucide-hard-drive" />{{ t('private') }}</span>
            <span><i class="i-lucide-wifi-off" />{{ t('offline') }}</span>
            <span><i class="i-lucide-code-xml" />{{ t('openSource') }}</span>
          </div>
        </div>
        <button class="scroll-cue" type="button" @click="goToSlide(1)"><span>{{ t('explore') }}</span><i class="i-lucide-arrow-down" /></button>
      </SwiperSlide>

      <SwiperSlide id="features" tag="section" class="showcase-section">
        <ProductGallery />
      </SwiperSlide>

      <SwiperSlide tag="section" class="feature-duo-slide">
        <FeatureDuo />
      </SwiperSlide>

      <SwiperSlide tag="section" class="privacy-section">
        <div class="privacy-slide-content">
          <div class="page-shell privacy-card" data-reveal>
            <div ref="privacyTitleStage" class="privacy-title-stage" :class="{ 'is-rendered': privacyRendered }" aria-live="polite">
              <span class="privacy-title-markdown" aria-hidden="true"><b>##</b>{{ typedPrivacyTitle }}<i class="hero-markdown__cursor" /></span>
              <h2>{{ t('privacyTitle') }}</h2>
            </div>
            <p>{{ t('privacyText') }}</p>
            <NuxtLink class="text-link" to="/install">{{ t('installNow') }} <span>→</span></NuxtLink>
          </div>
        </div>
        <SiteFooter />
      </SwiperSlide>
    </Swiper>
  </main>
</template>

<script setup lang="ts">
import { A11y, Keyboard, Mousewheel, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import type { Swiper as SwiperInstance } from 'swiper'
import 'swiper/css'
import 'swiper/css/pagination'

const { locale, t } = useLocale()
useReveal()

const swiper = shallowRef<SwiperInstance | null>(null)
const swiperModules = [A11y, Keyboard, Mousewheel, Pagination]
const mousewheelOptions = {
  forceToAxis: true,
  releaseOnEdges: false,
  sensitivity: 1,
  thresholdDelta: 18,
  thresholdTime: 450
}
function onSwiper(instance: SwiperInstance) {
  swiper.value = instance
}

function goToSlide(index: number) {
  swiper.value?.slideTo(index)
}

const heroRendered = ref(false)
const typedSource = ref('')
let animationToken = 0
const privacyTitleStage = ref<HTMLElement | null>(null)
const privacyRendered = ref(false)
const typedPrivacyTitle = ref('')
let privacyVisible = false
let privacyAnimationToken = 0
let privacyObserver: IntersectionObserver | undefined

const markdownSource = computed(() => `${t('heroTitleA')}\n${t('heroTitleB')}`)
const typedLines = computed(() => {
  const [first = '', second = ''] = typedSource.value.split('\n')
  return [first, second]
})

const wait = (duration: number) => new Promise(resolve => setTimeout(resolve, duration))

async function playHeroTransformation() {
  const token = ++animationToken
  heroRendered.value = false
  typedSource.value = ''

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    typedSource.value = markdownSource.value
    heroRendered.value = true
    return
  }

  await wait(180)
  for (const character of markdownSource.value) {
    if (token !== animationToken) return
    typedSource.value += character
    await wait(character === '\n' ? 130 : 23)
  }
  await wait(560)
  if (token === animationToken) heroRendered.value = true
}

async function playPrivacyTransformation() {
  const token = ++privacyAnimationToken
  privacyRendered.value = false
  typedPrivacyTitle.value = ''
  const title = t('privacyTitle')

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    typedPrivacyTitle.value = title
    privacyRendered.value = true
    return
  }

  await wait(180)
  for (const character of title) {
    if (token !== privacyAnimationToken) return
    typedPrivacyTitle.value += character
    await wait(36)
  }
  await wait(480)
  if (token === privacyAnimationToken) privacyRendered.value = true
}

onMounted(() => {
  playHeroTransformation()
  privacyObserver = new IntersectionObserver((entries) => {
    if (!entries.some(entry => entry.isIntersecting)) return
    privacyVisible = true
    playPrivacyTransformation()
    privacyObserver?.disconnect()
  }, { threshold: 0.5 })
  if (privacyTitleStage.value) privacyObserver.observe(privacyTitleStage.value)
})

watch(locale, () => {
  playHeroTransformation()
  if (privacyVisible) playPrivacyTransformation()
})

onBeforeUnmount(() => {
  animationToken += 1
  privacyAnimationToken += 1
  privacyObserver?.disconnect()
})

</script>
