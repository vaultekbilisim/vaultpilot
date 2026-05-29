const revealObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible')
      revealObserver.unobserve(entry.target)
    }
  }
}, { threshold: 0.16 })

document.querySelectorAll('[data-reveal]').forEach((element) => revealObserver.observe(element))

const menuToggle = document.querySelector('[data-menu-toggle]')
const mobileMenu = document.querySelector('[data-mobile-menu]')

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true'
    menuToggle.setAttribute('aria-expanded', String(!isOpen))
    mobileMenu.toggleAttribute('hidden', isOpen)
    document.documentElement.classList.toggle('menu-open', !isOpen)
  })
}
