/* Mobile navigation. The panel is the same markup the desktop bar uses,
   so there is one set of links to keep in sync, not two. */
(function(){
  var toggle = document.getElementById('navToggle');
  var menu   = document.getElementById('navMenu');
  if(!toggle || !menu) return;

  function close(){
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded','false');
    toggle.setAttribute('aria-label','Open menu');
  }
  function open(){
    menu.classList.add('open');
    toggle.setAttribute('aria-expanded','true');
    toggle.setAttribute('aria-label','Close menu');
  }

  toggle.addEventListener('click', function(e){
    e.stopPropagation();
    menu.classList.contains('open') ? close() : open();
  });
  menu.addEventListener('click', function(e){
    if(e.target.closest('a')) close();
  });
  document.addEventListener('click', function(e){
    if(menu.classList.contains('open') && !menu.contains(e.target)) close();
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && menu.classList.contains('open')){ close(); toggle.focus(); }
  });
  window.addEventListener('resize', function(){
    if(window.innerWidth > 940) close();
  });
})();

/* The jump bar sticks below the header, and anchored sections have to clear
   both. Measuring beats hardcoding, which is what put the bar 14px under the
   header in the first place. */
(function(){
  var root = document.documentElement;
  function measure(){
    var nav  = document.querySelector('.nav');
    var jump = document.querySelector('.jump');
    if(nav)  root.style.setProperty('--nav-h',  Math.round(nav.getBoundingClientRect().height)  + 'px');
    if(jump) root.style.setProperty('--jump-h', Math.round(jump.getBoundingClientRect().height) + 'px');
  }
  measure();
  window.addEventListener('resize', measure);
  window.addEventListener('load', measure);          // webfonts can change the height
  if('ResizeObserver' in window){
    var nav = document.querySelector('.nav');
    if(nav) new ResizeObserver(measure).observe(nav);
  }
})();
