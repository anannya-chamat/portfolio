/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId);
  
    if (toggle && nav) {
      toggle.addEventListener('click', () => {
        nav.classList.toggle('show');
      });
    }
  };
  showMenu('nav-toggle', 'nav-menu');
  
  /*===== REMOVE MOBILE MENU ON LINK CLICK =====*/
  const navLinks = document.querySelectorAll('.nav__link');
  navLinks.forEach(link =>
    link.addEventListener('click', () => {
      document.getElementById('nav-menu').classList.remove('show');
    })
  );
  
  /*===== SCROLL ACTIVE LINK =====*/
  const sections = document.querySelectorAll('section[id]');
  
  function scrollActive() {
    const scrollY = window.scrollY;
  
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 50;
      const sectionId = current.getAttribute('id');
      const navLink = document.querySelector(`.nav__menu a[href*='${sectionId}']`);
  
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLink?.classList.add('active-link');
      } else {
        navLink?.classList.remove('active-link');
      }
    });
  }
  window.addEventListener('scroll', scrollActive);
  
  /*===== SCROLL REVEAL ANIMATION =====*/
  if (typeof ScrollReveal !== 'undefined') {
    const sr = ScrollReveal({
      origin: 'top',
      distance: '60px',
      duration: 2000,
      delay: 200,
      reset: false
    });
  
    sr.reveal('.home__data, .about__img, .section-title', {});
    sr.reveal('.about__text, .home__social-icon, .contact__form', { interval: 200 });
    sr.reveal('.skills-grid .skill-card, .work__img img', {
      interval: 150,
      origin: 'bottom',
      distance: '40px'
    });
  }  