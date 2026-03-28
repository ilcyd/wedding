/* =============================================
   WEDDING INVITATION — SCRIPT.JS
   ============================================= */

// ─── Scroll Intro ────────────────────────────────────────────────────────────
(function initScrollIntro() {
  const intro = document.getElementById('scroll-intro');
  if (!intro) return;

  // Lock scroll while covering the page
  document.body.style.overflow = 'hidden';

  function openScroll() {
    intro.classList.add('si-open');
    setTimeout(function () {
      intro.remove();
      document.body.style.overflow = '';
    }, 1100); // wait for 1s transition to finish
  }

  // Or immediately on click/tap
  intro.addEventListener('click', function () {
    openScroll();
  }, { once: true });
}());


// ─── Countdown Timer ───────────────────────────────────────────────────────
(function initCountdown() {
  const weddingDate = new Date('2026-05-09T14:00:00');

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const now  = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
      document.getElementById('countdown').innerHTML =
        '<p style="font-family:\'Great Vibes\',cursive;font-size:2.5rem;color:#c9a96e;">Today is the day! &#10084;</p>';
      return;
    }

    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent    = pad(days);
    document.getElementById('hours').textContent   = pad(hours);
    document.getElementById('minutes').textContent = pad(minutes);
    document.getElementById('seconds').textContent = pad(seconds);
  }

  tick();
  setInterval(tick, 1000);
}());


// ─── Falling Lilac Petals ───────────────────────────────────────────────────
(function initPetals() {
  const container = document.getElementById('petals');
  const COUNT     = 26;

  // Soft lilac shades for petal bodies.
  const colors = ['#e7d2fb', '#d4b0ef', '#bf93e2', '#a774d0', '#c79be7', '#f0e0ff'];

  for (let i = 0; i < COUNT; i++) {
    const petal = document.createElement('div');
    petal.classList.add('petal');

    const width    = Math.random() * 8 + 10;      // 10–18 px
    const height   = width * (Math.random() * 0.7 + 1.15); // elongated petal
    const startX   = Math.random() * 100;
    const duration = Math.random() * 10 + 9;      // 9–19 s
    const delay    = Math.random() * 14;
    const opacity  = Math.random() * 0.35 + 0.45;
    const blur     = Math.random() * 0.35;
    const hue      = Math.random() * 14 - 7;
    const rotate   = Math.random() * 70 - 35;
    const color    = colors[Math.floor(Math.random() * colors.length)];

    petal.style.cssText = `
      width:${width}px;
      height:${height}px;
      left:${startX}%;
      animation-duration:${duration}s;
      animation-delay:-${delay}s;
      opacity:${opacity};
      background:${color};
      transform:rotate(${rotate}deg);
      filter:blur(${blur}px) hue-rotate(${hue}deg);
    `;

    container.appendChild(petal);
  }
}());


// ─── Scroll Reveal ───────────────────────────────────────────────────────────
(function initReveal() {
  const targets = [
    '#countdown-section .section-label',
    '#countdown-section .section-title',
    '#countdown-section .divider',
    '#countdown-section .countdown',
    '#story .section-label',
    '#story .section-title',
    '#story .divider',
    '.story-card',
    '#details .section-label',
    '#details .section-title',
    '#details .divider',
    '.event-card',
    '.attire-box',
    '#gallery .section-label',
    '#gallery .section-title',
    '#gallery .divider',
    '.gallery-item',
    '#rsvp .section-label',
    '#rsvp .section-title',
    '#rsvp .divider',
    '#rsvp-form',
  ];

  targets.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.08}s`;
    });
  });

  const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    }),
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}());


// ─── RSVP Form ───────────────────────────────────────────────────────────────
(function initRsvp() {
  const form    = document.getElementById('rsvp-form');
  const success = document.getElementById('rsvp-success');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Basic client-side validation
    const name  = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!name) {
      showError(document.getElementById('name'), 'Please enter your name.');
      return;
    }
    if (!isValidEmail(email)) {
      showError(document.getElementById('email'), 'Please enter a valid email.');
      return;
    }

    // In a real deployment, POST this data to a backend / email service.
    // For now we just show the success message.
    form.style.display = 'none';
    success.classList.remove('hidden');
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showError(input, message) {
    clearError(input);
    input.style.borderColor = '#c0392b';
    const msg = document.createElement('p');
    msg.className = 'field-error';
    msg.style.cssText = 'color:#c0392b;font-size:0.78rem;margin-top:4px;';
    msg.textContent = message;
    input.parentNode.appendChild(msg);
    input.focus();
    input.addEventListener('input', () => clearError(input), { once: true });
  }

  function clearError(input) {
    input.style.borderColor = '';
    const err = input.parentNode.querySelector('.field-error');
    if (err) err.remove();
  }
}());


// ─── Smooth-scroll for internal anchor links ─────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
