<template>
  <div class="product-showcase page-shell">
    <div ref="titleStage" class="showcase-heading" :class="{ 'is-rendered': titleRendered }" aria-live="polite">
      <div class="showcase-title-stage">
        <span class="showcase-title-markdown" aria-hidden="true"><b>##</b>{{ typedTitle }}<i class="hero-markdown__cursor" /></span>
        <h2>{{ t('galleryTitle') }}</h2>
      </div>
    </div>

    <div class="showcase-carousel" data-reveal>
      <Swiper
        class="showcase-swiper"
        :modules="carouselModules"
        :slides-per-view="'auto'"
        :space-between="22"
        :speed="500"
        :loop="true"
        :nested="true"
        :grab-cursor="true"
        :autoplay="{ delay: 2200, disableOnInteraction: false, pauseOnMouseEnter: true }"
        @swiper="onCarousel"
      >
        <SwiperSlide v-for="(image, index) in carouselImages" :key="`${image.src}-${index}`" class="showcase-slide">
          <div class="showcase-item">
            <button class="showcase-shot" type="button" @click="openLightbox(image, index % showcaseImages.length)">
              <img :src="image.src" :alt="t(image.alt)" width="1600" height="900" loading="lazy" decoding="async">
            </button>
            <div class="shot-label-stage" aria-hidden="true">
              <span class="shot-label-source" :style="{ '--characters': t(image.label).length + 2 }"><b>#</b>{{ t(image.label) }}</span>
              <strong>{{ t(image.label) }}</strong>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <button class="carousel-arrow prev" type="button" :aria-label="t('previousScreenshot')" @click="stepCarousel(-1)"><i class="i-lucide-chevron-left" /></button>
      <button class="carousel-arrow next" type="button" :aria-label="t('nextScreenshot')" @click="stepCarousel(1)"><i class="i-lucide-chevron-right" /></button>
    </div>

    <Teleport to="body">
      <Transition name="lightbox">
        <div v-if="selectedImage" class="showcase-lightbox swiper-no-mousewheel" role="dialog" aria-modal="true" :aria-label="t('screenshotPreview')" @click.self="closeLightbox">
          <div class="lightbox-panel">
            <div class="lightbox-image-wrap">
              <button class="lightbox-close" type="button" :aria-label="t('closePreview')" @click="closeLightbox">
                <i class="i-lucide-x" />
              </button>
              <button class="lightbox-arrow prev" type="button" :aria-label="t('previousImage')" @click="stepImage(-1)"><i class="i-lucide-chevron-left" /></button>
              <img :src="selectedImage.src" :alt="t(selectedImage.alt)" width="1600" height="900">
              <button class="lightbox-arrow next" type="button" :aria-label="t('nextImage')" @click="stepImage(1)"><i class="i-lucide-chevron-right" /></button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import type { Swiper as SwiperInstance } from 'swiper'

type ShowcaseImage = {
  label: string
  alt: string
  src: string
}

const { locale, t } = useLocale()

// 后续只需替换这里的分类名称和图片路径即可。
const showcaseImages: ShowcaseImage[] = [
  { label: 'immersiveReading', alt: 'immersiveReadingAlt', src: '/showcase/marknest-reading.webp' },
  { label: 'freeEditing', alt: 'freeEditingAlt', src: '/showcase/marknest-editor.webp' },
  { label: 'contentCapture', alt: 'contentCaptureAlt', src: '/showcase/marknest-capture.webp' }
]

const selectedImage = ref<ShowcaseImage | null>(null)
const selectedIndex = ref(0)
const carousel = shallowRef<SwiperInstance | null>(null)
const titleStage = ref<HTMLElement | null>(null)
const titleRendered = ref(false)
const typedTitle = ref('')
const carouselModules = [Autoplay]
const carouselImages = computed(() => [...showcaseImages, ...showcaseImages])
let titleVisible = false
let titleAnimationToken = 0
let titleObserver: IntersectionObserver | undefined

const wait = (duration: number) => new Promise(resolve => setTimeout(resolve, duration))

async function playTitleTransformation() {
  const token = ++titleAnimationToken
  const title = t('galleryTitle')
  titleRendered.value = false
  typedTitle.value = ''

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    typedTitle.value = title
    titleRendered.value = true
    return
  }

  await wait(180)
  for (const character of title) {
    if (token !== titleAnimationToken) return
    typedTitle.value += character
    await wait(28)
  }
  await wait(480)
  if (token === titleAnimationToken) titleRendered.value = true
}

function onCarousel(instance: SwiperInstance) {
  carousel.value = instance
}

function stepCarousel(direction: number) {
  if (direction > 0) carousel.value?.slideNext()
  else carousel.value?.slidePrev()
}

function openLightbox(image: ShowcaseImage, index: number) {
  carousel.value?.autoplay?.stop()
  selectedImage.value = image
  selectedIndex.value = index
}

function closeLightbox() {
  selectedImage.value = null
  carousel.value?.autoplay?.start()
}

function stepImage(direction: number) {
  selectedIndex.value = (selectedIndex.value + direction + showcaseImages.length) % showcaseImages.length
  selectedImage.value = showcaseImages[selectedIndex.value]
}

function handleKeydown(event: KeyboardEvent) {
  if (!selectedImage.value) return
  if (event.key === 'Escape') closeLightbox()
  if (event.key === 'ArrowLeft') stepImage(-1)
  if (event.key === 'ArrowRight') stepImage(1)
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  titleObserver = new IntersectionObserver((entries) => {
    if (!entries.some(entry => entry.isIntersecting)) return
    titleVisible = true
    playTitleTransformation()
    titleObserver?.disconnect()
  }, { threshold: 0.5 })
  if (titleStage.value) titleObserver.observe(titleStage.value)
})

watch(locale, () => {
  if (titleVisible) playTitleTransformation()
})

onBeforeUnmount(() => {
  titleAnimationToken += 1
  titleObserver?.disconnect()
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.product-showcase { min-width: 0; }
.showcase-heading { max-width: 820px; }
.showcase-title-stage { display: grid; min-height: clamp(70px, 8vw, 106px); align-items: center; }
.showcase-title-stage > * { grid-area: 1 / 1; }
.showcase-title-markdown { opacity: 1; color: var(--muted); font: 650 clamp(17px, 2.2vw, 27px)/1.45 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; letter-spacing: -.04em; filter: blur(0); transform: scale(1); transition: opacity .4s ease, filter .55s ease, transform .55s ease; }
.showcase-title-markdown b { margin-right: .65em; color: var(--accent); }
.showcase-heading h2 { margin: 0; opacity: 0; font-size: clamp(28px, 3vw, 42px); letter-spacing: -.035em; line-height: 1.25; filter: blur(8px); transform: translateY(14px) scale(.985); transition: opacity .65s ease .1s, filter .75s ease .1s, transform .75s cubic-bezier(.2,.8,.2,1) .1s; }
.showcase-heading.is-rendered .showcase-title-markdown { opacity: 0; filter: blur(10px); transform: scale(.97); pointer-events: none; }
.showcase-heading.is-rendered .hero-markdown__cursor { animation: none; opacity: 0; }
.showcase-heading.is-rendered h2 { opacity: 1; filter: blur(0); transform: none; }
.showcase-carousel { position: relative; width: 100vw; margin-top: 30px; margin-left: calc((min(1180px, calc(100vw - 40px)) - 100vw) / 2); overflow: hidden; mask-image: linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent); }
.showcase-swiper { width: 100%; padding: 10px 22px 18px; overflow: hidden; }
.showcase-slide { width: clamp(380px, 42vw, 580px); }
.showcase-item { width: 100%; }
.showcase-shot { position: relative; display: block; width: 100%; padding: 0; overflow: hidden; border: 1px solid var(--line); border-radius: 20px; color: var(--ink); background: var(--panel-solid); box-shadow: 0 20px 55px rgba(42, 30, 102, .12); cursor: zoom-in; text-align: left; transition: transform .35s ease, box-shadow .35s ease; }
.showcase-item:hover .showcase-shot { transform: translateY(-5px); box-shadow: 0 28px 72px rgba(42, 30, 102, .19); }
.showcase-shot img { display: block; width: 100%; height: auto; aspect-ratio: 16 / 9; object-fit: contain; background: #101010; }
.shot-label-stage { position: relative; display: grid; height: 46px; align-items: center; justify-content: center; margin-top: 8px; color: var(--muted); }
.shot-label-stage > * { grid-area: 1 / 1; }
.shot-label-source { width: 0; overflow: hidden; opacity: 0; color: var(--muted); font: 650 13px/1.2 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; white-space: nowrap; }
.shot-label-source b { margin-right: 7px; color: var(--accent); }
.shot-label-stage strong { opacity: 0; color: var(--ink); font-size: 18px; letter-spacing: -.02em; filter: blur(7px); transform: translateY(6px); }
.showcase-item:hover .shot-label-source { animation: shot-label-source 1.05s both; }
.showcase-item:hover .shot-label-stage strong { animation: shot-label-render .55s cubic-bezier(.2,.8,.2,1) .72s both; }
.carousel-arrow { position: absolute; z-index: 4; top: calc(50% - 27px); display: grid; width: 44px; height: 44px; place-items: center; border: 1px solid rgba(255,255,255,.28); border-radius: 50%; opacity: 0; color: #fff; background: rgba(18,15,33,.56); backdrop-filter: blur(10px); cursor: pointer; transform: translateY(-50%) scale(.9); pointer-events: none; font-size: 20px; transition: opacity .22s ease, background .2s ease, transform .22s ease; }
.showcase-carousel:hover .carousel-arrow, .showcase-carousel:focus-within .carousel-arrow { opacity: 1; transform: translateY(-50%) scale(1); pointer-events: auto; }
.carousel-arrow:hover { background: rgba(18,15,33,.82); }
.carousel-arrow.prev { left: 24px; }
.carousel-arrow.next { right: 24px; }
.showcase-lightbox { position: fixed; inset: 0; z-index: 300; display: grid; place-items: center; padding: 14px 24px; background: rgba(7, 6, 12, .96); }
.lightbox-panel { width: min(1220px, 96vw); }
.lightbox-image-wrap { position: relative; display: grid; place-items: center; }
.lightbox-image-wrap img { display: block; width: auto; max-width: 100%; height: auto; max-height: calc(100svh - 28px); border-radius: 18px; object-fit: contain; box-shadow: 0 35px 120px rgba(0,0,0,.45); }
.lightbox-close { position: absolute; z-index: 3; top: 14px; right: 14px; display: grid; width: 40px; height: 40px; place-items: center; border: 0; border-radius: 50%; color: #fff; background: rgba(18,15,33,.48); backdrop-filter: blur(10px); cursor: pointer; font-size: 19px; }
.lightbox-arrow { position: absolute; z-index: 2; top: 50%; display: grid; width: 40px; height: 40px; place-items: center; border: 0; border-radius: 50%; color: #fff; background: rgba(18,15,33,.42); backdrop-filter: blur(8px); cursor: pointer; transform: translateY(-50%); font-size: 19px; transition: background .2s, transform .2s; }
.lightbox-arrow:hover { background: rgba(18,15,33,.7); transform: translateY(-50%) scale(1.06); }
.lightbox-arrow.prev { left: 14px; }
.lightbox-arrow.next { right: 14px; }
.lightbox-enter-active, .lightbox-leave-active { transition: opacity .25s ease; }
.lightbox-enter-active .lightbox-panel, .lightbox-leave-active .lightbox-panel { transition: transform .3s ease, opacity .25s ease; }
.lightbox-enter-from, .lightbox-leave-to { opacity: 0; }
.lightbox-enter-from .lightbox-panel, .lightbox-leave-to .lightbox-panel { opacity: 0; transform: translateY(18px) scale(.97); }

@keyframes shot-label-source {
  0% { width: 0; opacity: 1; }
  48% { width: calc(var(--characters) * 1em); opacity: 1; }
  68% { width: calc(var(--characters) * 1em); opacity: 1; filter: blur(0); }
  100% { width: calc(var(--characters) * 1em); opacity: 0; filter: blur(7px); }
}
@keyframes shot-label-render {
  from { opacity: 0; filter: blur(7px); transform: translateY(6px); }
  to { opacity: 1; filter: blur(0); transform: none; }
}

@media (max-width: 900px) {
  .product-showcase { width: 100%; }
  .showcase-carousel { margin-left: 0; }
}

@media (max-width: 620px) {
  .product-showcase { width: calc(100% - 28px); }
  .showcase-title-stage { min-height: 98px; }
  .showcase-title-markdown { font-size: 16px; }
  .showcase-heading h2 { font-size: 26px; }
  .showcase-carousel { width: calc(100% + 28px); margin-left: -14px; mask-image: linear-gradient(90deg, transparent, #000 3%, #000 97%, transparent); }
  .showcase-swiper { padding-inline: 14px; }
  .showcase-slide { width: min(76vw, 390px); }
  .showcase-shot { border-radius: 16px; }
  .showcase-lightbox { padding: 8px; }
  .lightbox-panel { width: 100%; }
  .lightbox-image-wrap img { border-radius: 10px; }
  .lightbox-close { top: 8px; right: 8px; width: 36px; height: 36px; }
  .lightbox-arrow { width: 36px; height: 36px; }
  .lightbox-arrow.prev { left: 8px; }
  .lightbox-arrow.next { right: 8px; }
  .carousel-arrow { display: none; }
}

@media (hover: none) {
  .shot-label-stage strong { opacity: 1; filter: none; transform: none; }
}

@media (prefers-reduced-motion: reduce) {
  .showcase-title-markdown { display: none; }
  .showcase-heading h2 { opacity: 1; filter: none; transform: none; }
  .showcase-item:hover .shot-label-source { display: none; animation: none; }
  .showcase-item:hover .shot-label-stage strong { opacity: 1; filter: none; transform: none; animation: none; }
}

</style>
