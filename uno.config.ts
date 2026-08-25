import { defineConfig, presetIcons, presetUno, transformerDirectives } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({ scale: 1.2 })
  ],
  transformers: [transformerDirectives()],
  shortcuts: {
    'icon-button': 'grid h-10 w-10 place-items-center rounded-full border-0 bg-transparent text-[var(--muted)] transition hover:bg-[var(--soft)] hover:text-[var(--ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]',
    'page-shell': 'mx-auto w-[min(1180px,calc(100%-40px))]'
  }
})
