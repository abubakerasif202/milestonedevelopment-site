const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');
const navLinks = document.querySelectorAll('[data-nav] a');
const contactForm = document.querySelector('[data-contact-form]');
const formStatus = document.querySelector('[data-form-status]');

const setHeaderState = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 12);
};

setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

const closeMenu = () => {
  nav?.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', 'Open navigation menu');
};

menuToggle?.addEventListener('click', () => {
  const isOpen = nav?.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});

navLinks.forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
  }
});

const revealItems = document.querySelectorAll('.reveal');

revealItems.forEach((item, index) => {
  item.style.setProperty('--reveal-index', String(Math.min(index % 8, 7)));
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -48px',
    },
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const projectType = new FormData(contactForm).get('project-type');
  contactForm.reset();
  if (formStatus) {
    const projectLabel = projectType ? ` for ${projectType}` : '';
    formStatus.textContent = `Thank you. Your enquiry details${projectLabel} are ready. Please call 1800 008 883 to speak with the team.`;
  }
});
