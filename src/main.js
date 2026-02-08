import './style.css'

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const animatedElements = document.querySelectorAll('[data-animate]')

if (!prefersReducedMotion) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.18,
    },
  )

  animatedElements.forEach((el) => observer.observe(el))

  const parallaxTargets = document.querySelectorAll('[data-parallax]')
  const handleScroll = () => {
    const scrollY = window.scrollY
    parallaxTargets.forEach((el) => {
      const speed = Number(el.dataset.parallax) || 0.3
      el.style.setProperty('--parallax-offset', `${scrollY * speed}px`)
    })
  }

  handleScroll()
  window.addEventListener('scroll', () => window.requestAnimationFrame(handleScroll), {
    passive: true,
  })
} else {
  animatedElements.forEach((el) => el.classList.add('is-visible'))
}
