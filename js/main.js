/* ============================================================
   ExamBuddy Nigeria — main.js
   Scripts are loaded at bottom of <body> so DOM is ready.
   No DOMContentLoaded wrapper needed.
   ============================================================ */

/* ---------- Toast ---------- */
window.showToast = function (msg) {
  var toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(function () { toast.classList.remove('show'); }, 4000);
};

/* ---------- Navbar scroll shadow ---------- */
var navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', function () {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

/* ---------- Accordion ---------- */
document.querySelectorAll('.accordion__head').forEach(function (head) {
  head.addEventListener('click', function () {
    var item = head.closest('.accordion__item');
    var group = item.closest('.accordion');
    if (group) {
      group.querySelectorAll('.accordion__item.open').forEach(function (open) {
        if (open !== item) open.classList.remove('open');
      });
    }
    item.classList.toggle('open');
  });
});

/* ---------- Scroll Reveal ---------- */
if ('IntersectionObserver' in window) {
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });
} else {
  document.querySelectorAll('.reveal').forEach(function (el) {
    el.classList.add('visible');
  });
}

/* ---------- Counter Animation ---------- */
function animateCounter(el) {
  var target = parseFloat(el.getAttribute('data-target'));
  var suffix = el.getAttribute('data-suffix') || '';
  var duration = 1800;
  var start = null;
  function step(ts) {
    if (!start) start = ts;
    var progress = Math.min((ts - start) / duration, 1);
    var eased = 1 - Math.pow(1 - progress, 3);
    var value = target * eased;
    el.textContent = (target % 1 === 0 ? Math.floor(value) : value.toFixed(1)) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

if ('IntersectionObserver' in window) {
  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-target]').forEach(function (el) {
    counterObserver.observe(el);
  });
}

/* ---------- Contact Form ---------- */
var contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    showToast('✅ Message sent! We\'ll reply within 24 hours.');
    contactForm.reset();
  });
}

/* ---------- Download buttons ---------- */
document.querySelectorAll('[data-download]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    showToast('📥 Download starting... Check your downloads folder.');
  });
});

/* ---------- Smooth scroll ---------- */
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    var target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
