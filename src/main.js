const prefersReducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const prefersReducedMotion = () => prefersReducedMotionQuery.matches;

const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');
const navLinks = document.querySelectorAll('[data-nav] a');
const preloader = document.querySelector('[data-preloader]');
const mapButtons = document.querySelectorAll('[data-map-dot]');
const mapTitle = document.querySelector('[data-map-title]');
const mapBody = document.querySelector('[data-map-body]');
const counters = document.querySelectorAll('[data-counter]');
const timelines = document.querySelectorAll('[data-timeline]');
const compareSliders = document.querySelectorAll('[data-compare-slider]');
const contactForms = document.querySelectorAll('[data-contact-form]');

const enquiryEmail = 'admin@milestonedevelopment.com.au';

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

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);

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

const setupNavigation = () => {
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
};

const setupHeaderState = () => {
  const syncHeaderState = () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 12);
  };

  syncHeaderState();
  window.addEventListener('scroll', syncHeaderState, { passive: true });
};

const setupPreloader = () => {
  if (!preloader) {
    return;
  }

  const finish = () => {
    if (preloader.dataset.done === 'true') {
      return;
    }

    preloader.dataset.done = 'true';
    preloader.classList.add('is-hiding');
    window.setTimeout(() => preloader.remove(), prefersReducedMotion() ? 0 : 420);
  };

  if (document.readyState === 'complete') {
    finish();
  } else {
    window.addEventListener('load', finish, { once: true });
    window.setTimeout(finish, 1400);
  }
};

const setupRevealBlocks = () => {
  const revealItems = [...document.querySelectorAll('.reveal')];

  revealItems.forEach((item, index) => {
    item.style.setProperty('--reveal-index', String(index % 6));
  });

  if (!revealItems.length) {
    return;
  }

  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.12,
    },
  );

  revealItems.forEach((item) => observer.observe(item));
};

const setupCounters = () => {
  const setFinalValue = (element) => {
    const target = Number(element.dataset.counter || '0');
    const suffix = element.dataset.counterSuffix || '';
    element.textContent = `${target}${suffix}`;
  };

  const animateCounter = (element) => {
    if (element.dataset.counterDone === 'true') {
      return;
    }

    element.dataset.counterDone = 'true';

    const target = Number(element.dataset.counter || '0');
    const suffix = element.dataset.counterSuffix || '';
    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const progress = clamp((now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = `${Math.round(target * eased)}${suffix}`;

      if (progress < 1) {
        window.requestAnimationFrame(tick);
      }
    };

    window.requestAnimationFrame(tick);
  };

  counters.forEach((element) => {
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      setFinalValue(element);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        animateCounter(element);
        observer.disconnect();
      },
      { rootMargin: '0px 0px -12% 0px' },
    );

    observer.observe(element);
  });
};

const setupTimelines = () => {
  if (!timelines.length) {
    return;
  }

  const timelineStates = [...timelines].map((timeline) => {
    let progress = timeline.querySelector('.timeline-progress');

    if (!progress) {
      progress = document.createElement('span');
      progress.className = 'timeline-progress';
      progress.setAttribute('aria-hidden', 'true');
      timeline.appendChild(progress);
    }

    const steps = [...timeline.querySelectorAll('li')];
    return { progress, steps, timeline };
  });

  const updateTimelineProgress = () => {
    timelineStates.forEach(({ progress, timeline }) => {
      const rect = timeline.getBoundingClientRect();
      const distance = Math.max(rect.height, 1);
      const progressValue = clamp((window.innerHeight * 0.72 - rect.top) / distance);
      progress.style.transform = `scaleX(${progressValue})`;
    });
  };

  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    timelineStates.forEach(({ progress, steps }) => {
      progress.style.transform = 'scaleX(1)';
      steps.forEach((step) => step.classList.add('is-active'));
    });
    return;
  }

  const stepObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-active');
        }
      });
    },
    { rootMargin: '0px 0px -22% 0px', threshold: 0.18 },
  );

  timelineStates.forEach(({ steps }) => {
    steps.forEach((step) => stepObserver.observe(step));
  });

  updateTimelineProgress();
  window.addEventListener('scroll', updateTimelineProgress, { passive: true });
  window.addEventListener('resize', updateTimelineProgress, { passive: true });
};

const setupBeforeAfter = () => {
  compareSliders.forEach((slider) => {
    const panel = slider.closest('[data-compare]') || document;
    const mask = panel.querySelector('[data-compare-mask]');

    if (!mask) {
      return;
    }

    const syncCompare = () => {
      mask.style.clipPath = `inset(0 ${100 - Number(slider.value)}% 0 0)`;
    };

    slider.addEventListener('input', syncCompare);
    syncCompare();
  });
};

const setupMap = () => {
  mapButtons.forEach((button) => {
    const isActive = button.classList.contains('is-active');
    button.setAttribute('aria-pressed', String(isActive));

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

const formatFieldName = (name) =>
  name
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase());

const buildEnquiryEmail = (form) => {
  const data = [...new FormData(form).entries()]
    .filter(([, value]) => String(value).trim())
    .map(([name, value]) => `${formatFieldName(name)}: ${String(value).trim()}`);

  const projectType = new FormData(form).get('project-type');
  const subject = projectType
    ? `Milestone Development enquiry - ${projectType}`
    : 'Milestone Development project enquiry';
  const body = [
    'New website enquiry prepared from milestonedevelopment.com.au.',
    '',
    ...data,
    '',
    'Preferred next step: Please contact me to discuss this project.',
  ].join('\n');

  return `mailto:${enquiryEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

const setupContactForms = () => {
  contactForms.forEach((form) => {
    form.addEventListener('submit', (event) => {
      if (!form.checkValidity()) {
        return;
      }

      event.preventDefault();
      const status = form.querySelector('[data-form-status]');
      const mailtoUrl = buildEnquiryEmail(form);

      if (status) {
        status.textContent =
          'Your email app should open with the enquiry details prepared. Please send the email or call 1800 008 883.';
      }

      window.location.href = mailtoUrl;
      form.reset();
    });
  });
};

setupNavigation();
setupHeaderState();
setupPreloader();
setupRevealBlocks();
setupCounters();
setupTimelines();
setupBeforeAfter();
setupMap();
setupContactForms();
