export function useReveal() {
  onMounted(() => {
    const nodes = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      }
    }, { threshold: 0.16 })
    nodes.forEach(node => observer.observe(node))
    onBeforeUnmount(() => observer.disconnect())
  })
}
