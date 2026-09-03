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
