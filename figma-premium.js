(() => {
  'use strict';

  const doc = document;
  const root = doc.documentElement;
  const lang = root.lang || 'pt-BR';
  const isPT = lang.toLowerCase().startsWith('pt');

  // Scroll progress inspired by the Figma concept.
  const progress = doc.createElement('div');
  progress.className = 'premium-scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  const bar = doc.createElement('span');
  progress.appendChild(bar);
  doc.body.appendChild(progress);
  const updateProgress = () => {
    const max = root.scrollHeight - root.clientHeight;
    const pct = max > 0 ? Math.min(100, Math.max(0, (root.scrollTop / max) * 100)) : 0;
    bar.style.width = `${pct}%`;
  };
  addEventListener('scroll', updateProgress, { passive: true });
  addEventListener('resize', updateProgress, { passive: true });
  updateProgress();

  // Terminal status line. Content stays factual and independent from the mockup copy.
  const main = doc.querySelector('.tb-main');
  if (main && !main.querySelector('.premium-terminal')) {
    const terminal = doc.createElement('div');
    terminal.className = 'premium-terminal';
    terminal.innerHTML = `
      <span class="premium-terminal-dots" aria-hidden="true"><i></i><i></i><i></i></span>
      <span>~/portfolio</span>
      <span aria-hidden="true">—</span>
      <small>${isPT ? 'dados + automação + sistemas' : 'data + automation + systems'}</small>`;
    main.prepend(terminal);
  }

  // Numbered section system from the Figma design spec.
  const indexed = [
    ['#resultados', '01'],
    ['#projetos', '02'],
    ['#experiencia', '03'],
    ['#stack', '04'],
    ['#perfil', '05'],
    ['#sobre', '06']
  ];
  indexed.forEach(([selector, n]) => {
    const section = doc.querySelector(selector);
    if (!section) return;
    const head = section.querySelector('.section-head, .results-proof-head');
    if (!head || head.querySelector('.premium-index')) return;
    const index = doc.createElement('span');
    index.className = 'premium-index';
    index.textContent = `[${n}]`;
    head.prepend(index);
  });

  // Fine-pointer custom cursor; automatically disabled for touch/reduced motion.
  const fine = matchMedia('(pointer:fine)').matches;
  const reduced = matchMedia('(prefers-reduced-motion:reduce)').matches;
  if (fine && !reduced) {
    const dot = doc.createElement('div');
    const ring = doc.createElement('div');
    dot.className = 'premium-cursor-dot';
    ring.className = 'premium-cursor-ring';
    dot.setAttribute('aria-hidden', 'true');
    ring.setAttribute('aria-hidden', 'true');
    doc.body.append(dot, ring);
    doc.body.classList.add('premium-pointer');

    let x = innerWidth / 2, y = innerHeight / 2;
    let rx = x, ry = y;
    addEventListener('mousemove', (e) => { x = e.clientX; y = e.clientY; }, { passive: true });
    const tick = () => {
      rx += (x - rx) * .12;
      ry += (y - ry) * .12;
      dot.style.transform = `translate3d(${x - 3.5}px,${y - 3.5}px,0)`;
      ring.style.transform = `translate3d(${rx - 19}px,${ry - 19}px,0)`;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
})();
