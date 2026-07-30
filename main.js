/*===== LIGHT / DARK THEME TOGGLE =====*/
const themeToggle = document.getElementById('theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

const storedTheme = () => {
  try {
    const saved = localStorage.getItem('theme');
    return saved === 'light' || saved === 'dark' ? saved : null;
  } catch (e) {
    return null;
  }
};

// Without an explicit choice the page follows the OS preference via CSS.
const currentTheme = () =>
  storedTheme() || (prefersDark.matches ? 'dark' : 'light');

const syncToggleLabel = () => {
  if (!themeToggle) return;
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  const label = `Switch to ${next} mode`;
  themeToggle.setAttribute('aria-label', label);
  themeToggle.setAttribute('title', label);
};

const setTheme = theme => {
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem('theme', theme);
  } catch (e) {
    /* Preference just won't persist across visits. */
  }
  syncToggleLabel();
};

themeToggle?.addEventListener('click', () => {
  setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
});

// Keep up with the OS while the visitor has not picked a theme themselves.
prefersDark.addEventListener('change', () => {
  if (!storedTheme()) syncToggleLabel();
});

syncToggleLabel();

/*===== MENU SHOW TOGGLE =====*/
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

/*===== CLOSE MENU ON LINK CLICK (EXCEPT RESUME) =====*/
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
  if (!link.classList.contains('nav__resume')) {
    link.addEventListener('click', () => {
      document.getElementById('nav-menu').classList.remove('show');
    });
  }
});

/*===== ACTIVE SECTION LINK ON SCROLL =====*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
  const scrollY = window.scrollY;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    const sectionId = current.getAttribute('id');
    const navLink = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLink?.classList.add('active-link');
    } else {
      navLink?.classList.remove('active-link');
    }
  });
}
window.addEventListener('scroll', scrollActive);

/*===== SCROLL REVEAL ANIMATIONS (Optional) =====*/
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
