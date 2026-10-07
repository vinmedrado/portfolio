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

  // Terminal "replay": stage the NPS pipeline output as if it were executing live,
  // synced with the numbered pipeline steps alongside it. Plays once, on first view.
  const terminalEl = document.querySelector('.terminal');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (terminalEl) {
    const rows = [...terminalEl.querySelectorAll('.terminal-line, .terminal-space, .terminal-stat, .terminal-done')];
    const steps = [...document.querySelectorAll('.flow-list li:not(.live) i')];
    if (reduceMotion || !('IntersectionObserver' in window)) {
      rows.forEach(row => row.classList.add('on'));
      steps.forEach(step => step.classList.add('on'));
    } else {
      const playTerminal = () => {
        rows.forEach((row, i) => setTimeout(() => row.classList.add('on'), 90 + i * 150));
        const stepGap = (90 + rows.length * 150) / (steps.length + 1);
        steps.forEach((step, i) => setTimeout(() => step.classList.add('on'), 260 + i * stepGap));
      };
      const termObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          playTerminal();
          observer.disconnect();
        });
      }, { threshold: 0.35 });
      termObserver.observe(terminalEl);
    }
  }

  // Impact numbers count up from zero the first time the section scrolls into view.
  const impactNumbers = [...document.querySelectorAll('.impact-grid strong')];
  if (impactNumbers.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      // leave static text as authored
    } else {
      impactNumbers.forEach(el => {
        const raw = el.textContent.trim();
        const match = raw.match(/^([\D]*)([\d.,]+)([\D]*)$/);
        if (!match) return;
        const [, prefix, numStr, suffix] = match;
        const digits = numStr.replace(/[.,]/g, '');
        const target = parseInt(digits, 10);
        if (Number.isNaN(target)) return;
        const groupChar = /\.\d{3}(\D|$)/.test(numStr) ? '.' : (/,\d{3}(\D|$)/.test(numStr) ? ',' : '');
        el.dataset.target = String(target);
        el.dataset.prefix = prefix;
        el.dataset.suffix = suffix;
        el.dataset.group = groupChar;
      });
      const format = (value, el) => {
        const str = String(value);
        const grouped = el.dataset.group
          ? str.replace(/\B(?=(\d{3})+(?!\d))/g, el.dataset.group)
          : str;
        return `${el.dataset.prefix}${grouped}${el.dataset.suffix}`;
      };
      const countUp = (el) => {
        const target = Number(el.dataset.target);
        const duration = 1100;
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = format(Math.round(target * eased), el);
          if (progress < 1) requestAnimationFrame(tick);
          else el.textContent = format(target, el);
        };
        requestAnimationFrame(tick);
      };
      const impactObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          countUp(entry.target);
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.4 });
      impactNumbers.forEach(el => impactObserver.observe(el));
    }
  }

})();
