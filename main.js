// Tygelsjö Bygg & Kakel — main.js

// ----- Lucide icons -----
lucide.createIcons();

// ----- Sticky header shadow -----
const header = document.getElementById('top') || document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });

// ----- Hamburger menu toggle -----
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('main-nav');

hamburger.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

// Close nav when a link is clicked (mobile)
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ----- Contact form submission -----
const form = document.getElementById('contact-form');
const formError = document.getElementById('form-error');

// Set _next dynamically so it works on any host
document.getElementById('form-next').value =
  window.location.origin + window.location.pathname + '?sent=1#kontakt';

form.addEventListener('submit', (e) => {
  const namn = form.namn.value.trim();
  const epost = form.epost.value.trim();
  const meddelande = form.meddelande.value.trim();

  if (!namn || !epost || !meddelande) {
    e.preventDefault();
    formError.textContent = 'Fyll i namn, e-post och meddelande.';
    return;
  }

  formError.textContent = '';
  // Form submits naturally to Formsubmit → reCAPTCHA → email → redirect back
});

// ----- Show success message after redirect -----
if (new URLSearchParams(window.location.search).get('sent') === '1') {
  const kontakt = document.getElementById('kontakt');
  const banner = document.createElement('div');
  banner.className = 'sent-banner';
  banner.textContent = 'Tack! Vi hör av oss så snart som möjligt.';
  kontakt.querySelector('.contact-form').prepend(banner);

  // Clean URL without reloading
  history.replaceState(null, '', window.location.pathname + '#kontakt');
}
