import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');
const navLinks = document.querySelectorAll('[data-nav] a');
const contactForm = document.querySelector('[data-contact-form]');
const formStatus = document.querySelector('[data-form-status]');
const preloader = document.querySelector('[data-preloader]');
const preloaderBar = document.querySelector('[data-preloader-bar]');
const galleryShell = document.querySelector('[data-gallery]');
const galleryTrack = document.querySelector('[data-gallery-track]');
const compareSlider = document.querySelector('[data-compare-slider]');
const compareMask = document.querySelector('[data-compare-mask]');
const timeline = document.querySelector('[data-timeline]');
const mapButtons = document.querySelectorAll('[data-map-dot]');
const mapTitle = document.querySelector('[data-map-title]');
const mapBody = document.querySelector('[data-map-body]');
const counters = document.querySelectorAll('[data-counter]');

const mapData = {
  nsw: {
    title: 'Sydney, NSW',
    body: 'Luxury homes, multi-residential development and premium construction delivery.',
  },
  vic: {
    title: 'Melbourne, VIC',
    body: 'Townhouses, dual occupancy developments and polished residential construction.',
  },
  qld: {
    title: 'Brisbane, QLD',
    body: 'Home and land packages, family homes and builder-led property development.',
  },
  wa: {
    title: 'Perth, WA',
    body: 'Commercial and industrial work with disciplined coordination and delivery.',
  },
};

const closeMenu = () => {
  nav?.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', 'Open navigation menu');
};

const openMenu = () => {
  nav?.classList.add('is-open');
  menuToggle?.setAttribute('aria-expanded', 'true');
  menuToggle?.setAttribute('aria-label', 'Close navigation menu');
};

menuToggle?.addEventListener('click', () => {
  const isOpen = nav?.classList.contains('is-open');
  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
});

navLinks.forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
  }
});

const syncHeaderState = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 12);
};

syncHeaderState();
window.addEventListener('scroll', syncHeaderState, { passive: true });

const revealTargets = [
  '.section-heading',
  '.featured-project',
  '.stat-card',
  '.service-card',
  '.why-media',
  '.why-copy',
  '.leader-card',
  '.project-card',
  '.gallery-card',
  '.map-panel',
  '.compare-panel',
  '.testimonial-card',
  '.process-list li',
  '.contact-copy',
  '.contact-form',
  '.faq-item',
  '.cta-inner',
];

const playHeroIntro = () => {
  if (prefersReducedMotion || !document.querySelector('.hero-copy')) {
    return;
  }

  const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
  timeline.from(
    '.hero-copy > *',
    { opacity: 0, y: 28, duration: 0.82, stagger: 0.08, immediateRender: false },
    0.05,
  );

  if (document.querySelector('.hero-panel-card')) {
    timeline.from(
      '.hero-panel-card',
      { opacity: 0, y: 28, duration: 0.72, stagger: 0.08, immediateRender: false },
      0.18,
    );
  }

  if (document.querySelector('.trust-bar > div')) {
    timeline.from(
      '.trust-bar > div',
      { opacity: 0, y: 24, duration: 0.72, stagger: 0.06, immediateRender: false },
      0.32,
    );
  }
};

const animatePreloader = () => {
  if (!preloader) {
    playHeroIntro();
    return;
  }

  const finish = () => {
    if (preloader.dataset.done === 'true') {
      return;
    }

    preloader.dataset.done = 'true';

    if (prefersReducedMotion) {
      preloader.remove();
      playHeroIntro();
      return;
    }

    gsap.to(preloader, {
      opacity: 0,
      duration: 0.45,
      ease: 'power2.out',
      onComplete: () => {
        preloader.remove();
        playHeroIntro();
      },
    });
  };

  if (preloaderBar) {
    gsap.fromTo(
      preloaderBar,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: prefersReducedMotion ? 0.1 : 1.15,
        ease: 'power2.out',
        transformOrigin: 'left center',
      },
    );
  }

  window.addEventListener('load', finish, { once: true });
  window.setTimeout(finish, 1400);
};

const animateRevealBlocks = () => {
  if (prefersReducedMotion) {
    return;
  }

  revealTargets.forEach((selector) => {
    const items = gsap.utils.toArray(selector);

    if (!items.length) {
      return;
    }

    ScrollTrigger.batch(items, {
      start: 'top 84%',
      once: true,
      onEnter: (batch) => {
        gsap.fromTo(batch, {
          opacity: 0,
          y: 24,
        }, {
          opacity: 1,
          y: 0,
          duration: 0.82,
          ease: 'power2.out',
          stagger: 0.08,
        });
      },
    });
  });
};

const animateCounters = () => {
  counters.forEach((element) => {
    const target = Number(element.dataset.counter || '0');
    const suffix = element.dataset.counterSuffix || '';

    if (prefersReducedMotion) {
      element.textContent = `${target}${suffix}`;
      return;
    }

    const state = { value: 0 };

    ScrollTrigger.create({
      trigger: element,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(state, {
          value: target,
          duration: 1.4,
          ease: 'power2.out',
          onUpdate: () => {
            element.textContent = `${Math.round(state.value)}${suffix}`;
          },
        });
      },
    });
  });
};

const animateGallery = () => {
  if (!galleryShell || !galleryTrack) {
    return;
  }

  const getScrollDistance = () => Math.max(0, galleryTrack.scrollWidth - galleryShell.clientWidth);

  if (!prefersReducedMotion) {
    if (getScrollDistance() <= 0) {
      return;
    }

    gsap.to(galleryTrack, {
      x: () => -getScrollDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: galleryShell,
        start: 'top top+=96',
        end: () => `+=${getScrollDistance()}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    const updateGalleryTilt = (event) => {
      const rect = galleryShell.getBoundingClientRect();
      const ratio = (event.clientX - rect.left) / rect.width;
      const offset = gsap.utils.clamp(-0.12, 0.12, (ratio - 0.5) * 0.18);

      gsap.to(galleryTrack, {
        rotateX: offset * 12,
        rotateY: offset * -10,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: true,
      });
    };

    galleryShell.addEventListener('pointermove', updateGalleryTilt);
    galleryShell.addEventListener('pointerleave', () => {
      gsap.to(galleryTrack, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: true,
      });
    });
  }
};

const animateHeroParallax = () => {
  if (prefersReducedMotion) {
    return;
  }

  const targets = [
    ['.hero-media img', 14],
    ['.featured-project-media img', 10],
    ['.cta-media img', 10],
    ['.why-media img', 8],
  ];

  targets.forEach(([selector, y]) => {
    const element = document.querySelector(selector);
    if (!element) {
      return;
    }

    gsap.to(element, {
      yPercent: y,
      ease: 'none',
      scrollTrigger: {
        trigger: element.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
};

const animateTimeline = () => {
  if (!timeline || prefersReducedMotion) {
    return;
  }

  const steps = timeline.querySelectorAll('li');
  const line = document.createElement('span');
  line.className = 'timeline-progress';
  timeline.appendChild(line);

  ScrollTrigger.create({
    trigger: timeline,
    start: 'top 72%',
    end: 'bottom 40%',
    scrub: true,
    onUpdate: (self) => {
      gsap.to(line, {
        scaleX: self.progress,
        duration: 0.2,
        ease: 'power1.out',
      });
    },
  });

  steps.forEach((step, index) => {
    ScrollTrigger.create({
      trigger: step,
      start: 'top 78%',
      once: true,
      onEnter: () => {
        step.classList.add('is-active');
      },
    });

    gsap.fromTo(
      step,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: step,
          start: 'top 84%',
          once: true,
        },
        delay: index * 0.04,
      },
    );
  });
};

const setupBeforeAfter = () => {
  if (!compareSlider || !compareMask) {
    return;
  }

  const syncCompare = () => {
    compareMask.style.clipPath = `inset(0 ${100 - Number(compareSlider.value)}% 0 0)`;
  };

  compareSlider.addEventListener('input', syncCompare);
  syncCompare();
};

const setupMap = () => {
  mapButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const key = button.dataset.mapDot;
      const location = mapData[key];

      if (!location) {
        return;
      }

      mapButtons.forEach((item) => {
        item.classList.toggle('is-active', item === button);
        item.setAttribute('aria-pressed', String(item === button));
      });

      if (mapTitle) {
        mapTitle.textContent = location.title;
      }

      if (mapBody) {
        mapBody.textContent = location.body;
      }
    });
  });
};

const setupContactForm = () => {
  contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const projectType = new FormData(contactForm).get('project-type');
    contactForm.reset();

    if (formStatus) {
      const projectLabel = projectType ? ` for ${projectType}` : '';
      formStatus.textContent = `Thank you. Your enquiry details${projectLabel} are ready. Please call 1800 008 883 to speak with the team.`;
    }
  });
};

animatePreloader();
animateRevealBlocks();
animateCounters();
animateGallery();
animateHeroParallax();
animateTimeline();
setupBeforeAfter();
setupMap();
setupContactForm();

window.addEventListener(
  'resize',
  () => {
    ScrollTrigger.refresh();
  },
  { passive: true },
);
