/* =============================================
   WEDDING INVITATION — SCRIPT.JS  v2
   ============================================= */

// ─── Background Music ────────────────────────────────────────────────────────
function initBackgroundMusic() {
  const bgm = document.getElementById('bgm');
  if (bgm) {
    bgm.volume = 0.3;
    bgm.play().catch(function (error) {
      console.log('Background music autoplay failed (expected in some browsers):', error);
    });
  }
}

// ─── BGM Mute Button ─────────────────────────────────────────────────────────
(function initBGMMuteButton() {
  const bgm     = document.getElementById('bgm');
  const muteBtn = document.getElementById('bgm-mute-btn');
  if (!bgm || !muteBtn) return;

  function updateMuteButton() {
    if (bgm.muted) {
      muteBtn.classList.add('muted');
      muteBtn.setAttribute('title', 'Unmute Music');
    } else {
      muteBtn.classList.remove('muted');
      muteBtn.setAttribute('title', 'Mute Music');
    }
  }

  muteBtn.addEventListener('click', function () {
    bgm.muted = !bgm.muted;
    updateMuteButton();
  });

  updateMuteButton();
}());

// ─── Scroll Intro ────────────────────────────────────────────────────────────
(function initScrollIntro() {
  const intro = document.getElementById('scroll-intro');
  if (!intro) return;

  document.body.style.overflow = 'hidden';

  function openScroll() {
    intro.classList.add('si-open');
    setTimeout(function () {
      intro.remove();
      document.body.style.overflow = '';
      initBackgroundMusic();
    }, 1500);
  }

  intro.addEventListener('click', openScroll, { once: true });
}());

// ─── Countdown Timer ─────────────────────────────────────────────────────────
(function initCountdown() {
  const weddingDate = new Date('2026-05-09T12:30:00');

  function pad(n) { return String(n).padStart(2, '0'); }

  function tick() {
    const now  = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
      document.getElementById('countdown').innerHTML =
        '<p style="font-family:\'Allura\',cursive;font-size:2.5rem;color:#deccf6;">Today is the day! &#10084;</p>';
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

// ─── Falling Lilac Petals ────────────────────────────────────────────────────
(function initPetals() {
  const container = document.getElementById('petals');
  if (!container) return;

  // Move the petal layer to body so it covers the full page
  document.body.appendChild(container);

  const COUNT  = 36;
  const colors = ['#e7d2fb', '#d4b0ef', '#bf93e2', '#a774d0', '#c79be7', '#f0e0ff'];

  for (let i = 0; i < COUNT; i++) {
    const petal    = document.createElement('div');
    petal.classList.add('petal');

    const width    = Math.random() * 8 + 10;
    const height   = width * (Math.random() * 0.7 + 1.15);
    const startX   = Math.random() * 100;
    const duration = Math.random() * 10 + 9;
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

// ─── Gallery Lightbox ────────────────────────────────────────────────────────
(function initLightbox() {
  const lb        = document.getElementById('lightbox');
  const lbImg     = document.getElementById('lb-img');
  const lbClose   = document.getElementById('lb-close');
  const lbPrev    = document.getElementById('lb-prev');
  const lbNext    = document.getElementById('lb-next');
  const lbCounter = document.getElementById('lb-counter');
  if (!lb) return;

  const items = Array.from(document.querySelectorAll('.carousel-item[data-src] img'));
  let current = 0;

  function showImg(index) {
    current = (index + items.length) % items.length;
    lbImg.classList.add('lb-loading');
    const src = items[current].parentElement.dataset.src;
    const tmp = new Image();
    tmp.onload = function () {
      lbImg.src = src;
      lbImg.alt = items[current].alt || '';
      lbImg.classList.remove('lb-loading');
    };
    tmp.src = src;
    lbCounter.textContent = (current + 1) + ' / ' + items.length;
  }

  function open(index) {
    lb.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    showImg(index);
    lbClose.focus();
  }

  function close() {
    lb.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  items.forEach(function (item, i) {
    item.style.cursor = 'pointer';
    item.addEventListener('click', function () { open(i); });
  });

  lbClose.addEventListener('click', close);
  lbPrev.addEventListener('click', function () { showImg(current - 1); });
  lbNext.addEventListener('click', function () { showImg(current + 1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });

  document.addEventListener('keydown', function (e) {
    if (lb.hasAttribute('hidden')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  showImg(current - 1);
    if (e.key === 'ArrowRight') showImg(current + 1);
  });
}());

// ─── Scroll Reveal ───────────────────────────────────────────────────────────
(function initReveal() {
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.reveal').forEach(function (el, i) {
    el.style.transitionDelay = Math.min(i * 0.06, 0.4) + 's';
    observer.observe(el);
  });
}());

// ─── RSVP Form ───────────────────────────────────────────────────────────────
(function initRsvp() {
  const form    = document.getElementById('rsvp-form');
  const success = document.getElementById('rsvp-success');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const name  = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!name) {
      showError(document.getElementById('name'), 'Please enter your name.');
      return;
    }
    if (!isValidEmail(email)) {
      showError(document.getElementById('email'), 'Please enter a valid email address.');
      return;
    }

    // In production, POST this data to a backend / email service.
    form.style.display = 'none';
    success.classList.remove('hidden');
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showError(input, message) {
    clearError(input);
    input.classList.add('is-invalid');
    const msg = document.createElement('p');
    msg.className = 'field-error';
    msg.style.cssText = 'color:#c0392b;font-size:.78rem;margin-top:4px;';
    msg.textContent = message;
    input.parentNode.appendChild(msg);
    input.focus();
    input.addEventListener('input', function () { clearError(input); }, { once: true });
  }

  function clearError(input) {
    input.classList.remove('is-invalid');
    const err = input.parentNode.querySelector('.field-error');
    if (err) err.remove();
  }
}());

// ─── Smooth-scroll for anchor links ─────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(function (link) {
  link.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navH = document.getElementById('main-nav')
        ? document.getElementById('main-nav').offsetHeight
        : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  });
});
