(function(){
  const button = document.querySelector('.mobile-menu-btn');
  const menu = document.getElementById('mobileMenu');
  if (!button || !menu) return;

  const isPt = document.documentElement.lang.toLowerCase().startsWith('pt');

  function setOpen(open){
    button.setAttribute('aria-expanded', String(open));
    button.setAttribute('aria-label', isPt ? (open ? 'Fechar menu de navegação' : 'Abrir menu de navegação') : (open ? 'Close navigation menu' : 'Open navigation menu'));
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', String(!open));
  }

  button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && button.getAttribute('aria-expanded') === 'true'){
      setOpen(false);
      button.focus();
    }
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 820) setOpen(false);
  }, { passive:true });
})();

(function(){
  const loader = document.getElementById('introLoader');
  if (!loader) return;
  const countEl = loader.querySelector('.intro-count');
  const barEl = loader.querySelector('.intro-bar-fill');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function finish(){
    loader.classList.add('is-done');
    document.documentElement.classList.remove('intro-lock');
    window.setTimeout(() => { loader.remove(); }, 900);
  }

  if (reduceMotion){
    finish();
    return;
  }

  document.documentElement.classList.add('intro-lock');
  let pct = 0;
  const duration = 550;
  const start = performance.now();

  function tick(now){
    const elapsed = now - start;
    pct = Math.min(100, Math.round((elapsed / duration) * 100));
    if (countEl) countEl.textContent = String(pct).padStart(2, '0');
    if (barEl) barEl.style.width = pct + '%';
    if (elapsed < duration){
      requestAnimationFrame(tick);
    } else {
      window.setTimeout(finish, 220);
    }
  }
  requestAnimationFrame(tick);
})();
