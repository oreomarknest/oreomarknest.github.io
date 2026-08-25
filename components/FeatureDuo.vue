<template>
  <div ref="root" class="duo-feature page-shell">
    <article
      v-for="(feature, index) in features"
      :key="feature.title"
      class="duo-feature__item"
      :class="{ 'duo-feature__item--reverse': index === 1 }"
      data-reveal
    >
      <div class="duo-feature__copy">
        <div
          class="duo-feature__title-stage"
          :class="{ 'is-rendered': rendered[index] }"
          :data-title-index="index"
          aria-live="polite"
        >
          <span class="duo-feature__markdown" aria-hidden="true">
            <b>##</b>{{ typedTitles[index] }}<i class="hero-markdown__cursor" />
          </span>
          <h2><i :class="feature.icon" />{{ t(feature.title) }}</h2>
        </div>
        <p>{{ t(feature.text) }}</p>
      </div>

      <figure class="duo-feature__visual">
        <img :src="feature.image" :alt="t(feature.alt)" width="1672" height="941" loading="lazy" decoding="async">
      </figure>
    </article>
  </div>
</template>

<script setup lang="ts">
const { locale, t } = useLocale()
const config = useRuntimeConfig()
const assetUrl = (path: string) => `${config.app.baseURL}${path}`

const features = [
  {
    title: 'realtimeTitle',
    text: 'realtimeText',
    alt: 'realtimeTitle',
    image: assetUrl('showcase/realtime-rendering.png'),
    icon: 'i-lucide-gauge'
  },
  {
    title: 'outlineTitle',
    text: 'outlineText',
    alt: 'outlineTitle',
    image: assetUrl('showcase/file-heading-tree.png'),
    icon: 'i-lucide-list-tree'
  }
]

const root = ref<HTMLElement | null>(null)
const typedTitles = reactive(['', ''])
const rendered = reactive([false, false])
const visible = reactive([false, false])
const animationTokens = [0, 0]
const wait = (duration: number) => new Promise(resolve => setTimeout(resolve, duration))

async function playTitle(index: number) {
  const token = ++animationTokens[index]
  typedTitles[index] = ''
  rendered[index] = false
  const title = t(features[index].title)

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    typedTitles[index] = title
    rendered[index] = true
    return
  }

  await wait(160 + index * 90)
  for (const character of title) {
    if (token !== animationTokens[index]) return
    typedTitles[index] += character
    await wait(36)
  }
  await wait(360)
  if (token === animationTokens[index]) rendered[index] = true
}

let observer: IntersectionObserver | undefined

onMounted(() => {
  const stages = root.value?.querySelectorAll<HTMLElement>('.duo-feature__title-stage')
  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      const index = Number((entry.target as HTMLElement).dataset.titleIndex)
      visible[index] = true
      playTitle(index)
      observer?.unobserve(entry.target)
    }
  }, { threshold: 0.45 })
  stages?.forEach(stage => observer?.observe(stage))
})

watch(locale, () => {
  visible.forEach((isVisible, index) => {
    if (isVisible) playTitle(index)
  })
})

onBeforeUnmount(() => {
  observer?.disconnect()
  animationTokens.forEach((_, index) => { animationTokens[index] += 1 })
})
</script>

<style scoped>
.duo-feature { display: grid; gap: clamp(24px, 3.4svh, 38px); }
.duo-feature__item { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); align-items: center; gap: clamp(48px, 7vw, 104px); }
.duo-feature__item--reverse { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.duo-feature__item[data-reveal] { opacity: 0; transform: translateX(-72px); transition: opacity .85s ease, transform .95s cubic-bezier(.2,.8,.2,1); }
.duo-feature__item--reverse[data-reveal] { transform: translateX(72px); transition-delay: .12s; }
.duo-feature__item[data-reveal].is-visible { opacity: 1; transform: none; }
.duo-feature__item--reverse .duo-feature__copy { order: 2; }
.duo-feature__item--reverse .duo-feature__visual { order: 1; }
.duo-feature__copy { min-width: 0; }
.duo-feature__title-stage { display: grid; min-height: 44px; align-items: center; }
.duo-feature__title-stage > * { grid-area: 1 / 1; }
.duo-feature__markdown { display: block; max-width: 100%; overflow: hidden; opacity: 1; color: var(--muted); font: 650 clamp(18px, 2vw, 26px)/1.25 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; letter-spacing: -.04em; white-space: nowrap; filter: blur(0); transform: scale(1); transition: opacity .4s ease, filter .55s ease, transform .55s ease; }
.duo-feature__markdown b { display: inline-block; margin-right: .6em; color: var(--accent); }
.duo-feature__title-stage h2 { display: flex; align-items: center; gap: 12px; margin: 0; opacity: 0; font-size: clamp(26px, 2.7vw, 40px); font-weight: 740; letter-spacing: -.05em; line-height: 1.12; filter: blur(8px); transform: translateY(12px) scale(.985); transition: opacity .65s ease .1s, filter .75s ease .1s, transform .75s cubic-bezier(.2,.8,.2,1) .1s; }
.duo-feature__title-stage h2 i { flex: 0 0 auto; color: var(--accent); font-size: .76em; }
.duo-feature__title-stage.is-rendered .duo-feature__markdown { opacity: 0; filter: blur(10px); transform: scale(.97); pointer-events: none; }
.duo-feature__title-stage.is-rendered .hero-markdown__cursor { animation: none; opacity: 0; }
.duo-feature__title-stage.is-rendered h2 { opacity: 1; filter: blur(0); transform: none; }
.duo-feature__copy p { margin: 15px 0 0; color: var(--muted); font-size: clamp(14px, 1.35vw, 17px); line-height: 1.75; }
.duo-feature__visual { width: min(100%, 520px); justify-self: end; margin: 0; overflow: hidden; border-radius: 20px; background: transparent; filter: drop-shadow(0 14px 24px rgba(54, 45, 105, .12)); transition: transform .5s cubic-bezier(.2,.8,.2,1), filter .35s ease; }
.duo-feature__item--reverse .duo-feature__visual { justify-self: start; }
.duo-feature__visual:hover { filter: drop-shadow(0 19px 30px rgba(54, 45, 105, .18)); transform: translateY(-5px); }
.duo-feature__visual img { display: block; width: 100%; height: auto; aspect-ratio: 16 / 9; object-fit: cover; }
.duo-feature__item--reverse .duo-feature__visual img { clip-path: inset(14.5% 9% 16% round 4%); }
:global(.dark) .duo-feature__visual { filter: brightness(.88) contrast(1.06) saturate(.94) drop-shadow(0 18px 34px rgba(0, 0, 0, .5)) drop-shadow(0 0 1px rgba(184, 173, 255, .42)); }
:global(.dark) .duo-feature__visual:hover { filter: brightness(.9) contrast(1.06) saturate(.98) drop-shadow(0 23px 40px rgba(0, 0, 0, .58)) drop-shadow(0 0 2px rgba(184, 173, 255, .5)); }

@media (max-width: 900px) {
  .duo-feature { gap: 72px; }
  .duo-feature__item, .duo-feature__item--reverse { grid-template-columns: 1fr; gap: 28px; }
  .duo-feature__item--reverse .duo-feature__copy, .duo-feature__item--reverse .duo-feature__visual { order: initial; }
  .duo-feature__copy { max-width: 650px; }
  .duo-feature__visual, .duo-feature__item--reverse .duo-feature__visual { width: 100%; justify-self: stretch; }
}

@media (max-width: 620px) {
  .duo-feature { gap: 58px; }
  .duo-feature__item, .duo-feature__item--reverse { gap: 22px; }
  .duo-feature__item[data-reveal] { transform: translateX(-34px); }
  .duo-feature__item--reverse[data-reveal] { transform: translateX(34px); }
  .duo-feature__item[data-reveal].is-visible { transform: none; }
  .duo-feature__title-stage { min-height: 40px; }
  .duo-feature__title-stage h2 { font-size: clamp(27px, 8vw, 34px); }
  .duo-feature__markdown { font-size: clamp(15px, 4.8vw, 21px); }
  .duo-feature__copy p { margin-top: 12px; font-size: 14px; }
  .duo-feature__visual { border-radius: 15px; }
}
</style>
