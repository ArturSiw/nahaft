(function(){
  'use strict';
  const burger=document.querySelector('[data-menu-toggle]');
  const mobileNav=document.querySelector('[data-mobile-nav]');
  let priorFocus=null;
  function closeMenu(){if(!burger||!mobileNav)return;mobileNav.classList.remove('is-open');burger.setAttribute('aria-expanded','false');burger.setAttribute('aria-label','Otwórz menu');document.body.classList.remove('nav-open');}
  if(burger&&mobileNav){
    burger.addEventListener('click',()=>{const open=mobileNav.classList.toggle('is-open');burger.setAttribute('aria-expanded',String(open));burger.setAttribute('aria-label',open?'Zamknij menu':'Otwórz menu');if(open){priorFocus=document.activeElement;mobileNav.querySelector('a')?.focus()}});
    mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&mobileNav.classList.contains('is-open')){closeMenu();burger.focus()}});
    window.matchMedia('(min-width: 861px)').addEventListener('change',e=>{if(e.matches)closeMenu()});
  }
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=String(new Date().getFullYear()));
  const filters=[...document.querySelectorAll('[data-filter]')];const cards=[...document.querySelectorAll('[data-category]')];
  filters.forEach(b=>b.addEventListener('click',()=>{const val=b.dataset.filter;filters.forEach(x=>{const active=x===b;x.classList.toggle('is-active',active);x.setAttribute('aria-pressed',String(active))});cards.forEach(card=>{card.hidden=val!=='all'&&!card.dataset.category.split(' ').includes(val)});}));
  const box=document.querySelector('#lightbox');let lastFocus=null;
  function closeLightbox(){if(!box)return;box.classList.remove('is-open');box.setAttribute('aria-hidden','true');document.body.style.overflow='';lastFocus?.focus()}
  document.querySelectorAll('[data-lightbox-src]').forEach(button=>button.addEventListener('click',()=>{if(!box)return;lastFocus=button;const img=box.querySelector('img');img.src=button.dataset.lightboxSrc;img.alt=button.dataset.lightboxAlt||'Zdjęcie haftu komputerowego';box.querySelector('[data-lightbox-caption]').textContent=button.dataset.lightboxTitle||'Realizacja NaHaft';box.classList.add('is-open');box.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';box.querySelector('[data-lightbox-close]')?.focus();}));
  box?.addEventListener('click',e=>{if(e.target===box||e.target.closest('[data-lightbox-close]'))closeLightbox()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&box?.classList.contains('is-open'))closeLightbox()});
})();
