function initGSAPAnimations() {
  // Respect user's motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // Hero fade-up
  gsap.from('.glass.hero', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' });
  // Hero number tick in
  gsap.from('.hero-num', { opacity: 0, y: -10, duration: 0.6, ease: 'power2.out' });
  // Verdict pill pop
  gsap.from('.anim-pop', { opacity: 0, scale: 0.8, duration: 0.6, ease: 'back.out(1.7)' });
  // Tide chart fade in
  gsap.from('.tide-chart', { opacity: 0, duration: 0.8, ease: 'power3.out' });
  // Staggered day boxes
  gsap.from('.day-box', { opacity: 0, y: 10, duration: 0.6, ease: 'power3.out', stagger: 0.08 });
  // Card float animation
  gsap.utils.toArray('.card').forEach((card, i) => {
    const idHash = card.dataset.id ? hashCode(card.dataset.id) : i;
    gsap.to(card, {
      y: () => Math.sin(Date.now() * 0.002 + idHash) * 3,
      duration: 6,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    });
  });
  // Button microinteractions
  gsap.utils.toArray('.level-btn').forEach(btn => {
    btn.addEventListener('pointerenter', () => gsap.to(btn, { scale: 1.05, duration: 0.2 }));
    btn.addEventListener('pointerleave', () => gsap.to(btn, { scale: 1, duration: 0.2 }));
    btn.addEventListener('pointerdown', () => gsap.to(btn, { scale: 0.95, duration: 0.1 }));
    btn.addEventListener('pointerup', () => gsap.to(btn, { scale: 1, duration: 0.2 }));
  });
  // Region select microinteraction (on the select container)
  const regionSelect = document.querySelector('.select-wrap');
  if (regionSelect) {
    regionSelect.addEventListener('pointerenter', () => gsap.to(regionSelect, { scale: 1.02, duration: 0.2 }));
    regionSelect.addEventListener('pointerleave', () => gsap.to(regionSelect, { scale: 1, duration: 0.2 }));
  }
  // Scroll-triggered animations for sections
  gsap.utils.toArray('.section-title').forEach((section, index) => {
    gsap.from(section, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out',
      delay: index * 0.1,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
  });
}

// Simple hash code function for string
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}