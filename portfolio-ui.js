(() => {
  const sidebar = document.getElementById('sidebar');
  const mobileMenu = document.getElementById('mobileMenu');
  if (sidebar && mobileMenu) {
    mobileMenu.addEventListener('click', () => sidebar.classList.toggle('open'));
    sidebar.addEventListener('click', (event) => {
      if (event.target.closest('a') && innerWidth <= 900) sidebar.classList.remove('open');
    });
  }

  const palette = document.getElementById('commandPalette');
  const trigger = document.getElementById('commandTrigger');
  const input = document.getElementById('commandInput');
  const items = [...document.querySelectorAll('[data-palette-item]')];

  const openPalette = () => {
    if (!palette) return;
    palette.classList.add('open');
    palette.setAttribute('aria-hidden', 'false');
    setTimeout(() => input?.focus(), 0);
  };
  const closePalette = () => {
    if (!palette) return;
    palette.classList.remove('open');
    palette.setAttribute('aria-hidden', 'true');
    if (input) input.value = '';
    items.forEach(item => item.classList.remove('hidden', 'match'));
  };
  trigger?.addEventListener('click', openPalette);
  document.querySelectorAll('[data-close-palette]').forEach(el => el.addEventListener('click', closePalette));
  items.forEach(item => item.addEventListener('click', closePalette));
  document.addEventListener('keydown', (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      palette?.classList.contains('open') ? closePalette() : openPalette();
    }
    if (event.key === 'Escape') closePalette();
  });
  input?.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    items.forEach(item => {
      const hit = !query || item.textContent.toLowerCase().includes(query);
      item.classList.toggle('hidden', !hit);
      item.classList.toggle('match', Boolean(query && hit));
    });
  });

  const navLinks = [...document.querySelectorAll('.side-nav a[href^="#"]')];
  const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`));
    }, { rootMargin: '-25% 0px -60% 0px', threshold: [0,.15,.4,.7] });
    sections.forEach(section => observer.observe(section));
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (event) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
      history.replaceState(null, '', id);
    });
  });

  // Subtle scroll reveal for terminal sections. Content stays visible when JS is unavailable.
  const revealTargets = [...document.querySelectorAll('.workspace-section, .log-entry, .project-card, .impact-grid article')];
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealTargets.forEach(el => el.classList.add('reveal-ready'));
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' });
    revealTargets.forEach(el => revealObserver.observe(el));
  }

})();
