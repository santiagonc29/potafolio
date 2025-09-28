// Utilidades de navegación activa y animaciones
(function(){
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);

  // Observa secciones para activar el link correspondiente
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const id = '#' + entry.target.id;
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === id));
      }
    });
  }, {rootMargin: '-40% 0px -50% 0px', threshold: 0.01});

  sections.forEach(sec => observer.observe(sec));

  // Animar aparición de elementos con clase .reveal
  const revealables = Array.from(document.querySelectorAll('.reveal'));
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {threshold: 0.1});
  revealables.forEach(el => revealObserver.observe(el));

  // Barras de habilidades
  const skillGroups = Array.from(document.querySelectorAll('.skill-group'));
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.querySelectorAll('.skill .bar').forEach(bar => {
          const percent = bar.getAttribute('data-percent') || '0';
          bar.parentElement.style.setProperty('--percent', percent + '%');
          bar.parentElement.classList.add('animated');
        });
        skillsObserver.unobserve(entry.target);
      }
    });
  }, {threshold: 0.3});
  skillGroups.forEach(g => skillsObserver.observe(g));

  // Año dinámico
  const yearEl = document.getElementById('year');
  if(yearEl){ yearEl.textContent = new Date().getFullYear(); }
  
  // Agregar clase de titileo al cargar
  window.addEventListener('DOMContentLoaded', () => {
    const flashTargets = document.querySelectorAll('.site-header, .hero-panel, .timeline-item .card, .project-card, .edu-card, .skill-group, .site-footer');
    flashTargets.forEach(el => el.classList.add('flash-on-load'));
    setTimeout(() => {
      flashTargets.forEach(el => el.classList.remove('flash-on-load'));
    }, 600); // 0.2s * 3
  });
})();


