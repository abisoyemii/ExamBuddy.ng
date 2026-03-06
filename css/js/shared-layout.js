/* ============================================================
   ExamBuddy Nigeria — shared-layout.js
   Injects topbar, navbar, newsletter & footer into every page
   All paths relative to root level (flat structure)
   ============================================================ */

(function () {
  /* ---- Topbar ---- */
  const topbarHTML = `
  <div class="topbar" id="topbar">
    <span>📣 JAMB 2025 registration is now open! <a href="jamb.html">Get our free preparation guide &rarr;</a></span>
    <button class="topbar__close" id="topbarClose" aria-label="Dismiss announcement">&#10005;</button>
  </div>`;

  /* ---- Navbar ---- */
  const navHTML = `
  <nav class="navbar" id="navbar">
    <div class="navbar__inner">
      <a href="index.html" class="navbar__logo">
        <img src="images/logo.png" alt="ExamBuddy Nigeria" style="height:42px;width:auto;display:block;">
      </a>
      <div class="navbar__links">
        <a href="index.html" data-page="index">Home</a>
        <a href="waec.html" data-page="waec">WAEC</a>
        <a href="jamb.html" data-page="jamb">JAMB</a>
        <a href="nysc.html" data-page="nysc">NYSC</a>
        <a href="neco.html" data-page="neco">NECO</a>
        <a href="study-resources.html" data-page="study-resources">Resources</a>
        <a href="blog.html" data-page="blog">Blog</a>
        <a href="exam-portals.html" data-page="exam-portals">Portals</a>
        <a href="about.html" data-page="about">About</a>
        <a href="dashboard.html" data-page="dashboard">📊 Dashboard</a>
      </div>
      <div class="navbar__cta">
        <a href="exam-portals.html" class="btn btn--blue btn--sm">Exam Portals &rarr;</a>
      </div>
      <button class="navbar__hamburger" id="hamburger" aria-label="Open menu">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="mobile-nav" id="mobileNav">
      <a href="index.html">🏠 Home</a>
      <a href="waec.html">📝 WAEC</a>
      <a href="jamb.html">🎯 JAMB</a>
      <a href="nysc.html">🏕️ NYSC</a>
      <a href="neco.html">📋 NECO</a>
      <a href="study-resources.html">📂 Resources</a>
      <a href="blog.html">✍️ Blog</a>
      <a href="exam-portals.html">🌐 Portals</a>
      <a href="about.html">ℹ️ About</a>
      <a href="dashboard.html">📊 My Dashboard</a>
      <a href="contact.html">📧 Contact</a>
      <a href="exam-portals.html" class="btn btn--primary">Exam Portals &rarr;</a>
    </div>
  </nav>`;

  /* ---- Newsletter ---- */
  const newsletterHTML = `
  <section class="newsletter">
    <div class="container newsletter__inner">
      <div>
        <h2>Stay Exam-Ready 📬</h2>
        <p>Get free study tips, past questions, and exam updates delivered to your inbox.</p>
      </div>
      <form class="newsletter-form" onsubmit="event.preventDefault();window.showToast&&showToast('🎉 Subscribed! Watch your inbox for updates.')">
        <input type="email" placeholder="Enter your email address" required aria-label="Email address" />
        <button type="submit" class="btn btn--primary">Subscribe Free</button>
      </form>
    </div>
  </section>`;

  /* ---- Footer ---- */
  const footerHTML = `
  <footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <div class="footer__brand">
          <div class="logo">
            <div class="navbar__logo-mark">E</div>
            ExamBuddy Nigeria
          </div>
          <p>Your ultimate Nigerian exam companion. Free guides, resources, and direct links to official portals for WAEC, JAMB, NYSC, NECO, and more.</p>
          <div class="social-links">
            <a href="#" class="social-link" aria-label="Twitter">𝕏</a>
            <a href="#" class="social-link" aria-label="Instagram">📷</a>
            <a href="#" class="social-link" aria-label="Facebook">f</a>
            <a href="#" class="social-link" aria-label="YouTube">▶</a>
          </div>
        </div>
        <div class="footer__col">
          <h5>Exam Guides</h5>
          <ul>
            <li><a href="waec.html">WAEC Guide</a></li>
            <li><a href="jamb.html">JAMB Guide</a></li>
            <li><a href="nysc.html">NYSC Guide</a></li>
            <li><a href="neco.html">NECO Guide</a></li>
            <li><a href="exam-portals.html">Exam Portals</a></li>
          </ul>
        </div>
        <div class="footer__col">
          <h5>Resources</h5>
          <ul>
            <li><a href="study-resources.html">Free Downloads</a></li>
            <li><a href="study-resources.html">Past Questions</a></li>
            <li><a href="study-resources.html">Study Timetables</a></li>
            <li><a href="blog.html">Blog & Articles</a></li>
          </ul>
        </div>
        <div class="footer__col">
          <h5>Company</h5>
          <ul>
            <li><a href="about.html">About Us</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="privacy.html">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
      <div class="footer__bottom">
        <span>© 2025 ExamBuddy Nigeria · Not affiliated with WAEC, JAMB, NYSC, or NECO</span>
        <div class="footer__bottom-links">
          <a href="privacy.html">Privacy Policy</a>
          <a href="contact.html">Contact</a>
        </div>
      </div>
    </div>
  </footer>`;

  /* ---- Toast div ---- */
  const toastHTML = `<div class="toast" id="toast"></div>`;

  /* ---- Inject & bind immediately (script is defer so DOM is already ready) ---- */
  function initLayout() {
    const navRoot = document.getElementById('nav-root');
    const footerRoot = document.getElementById('footer-root');

    if (navRoot) {
      navRoot.innerHTML = topbarHTML + navHTML;
    }
    if (footerRoot) {
      footerRoot.innerHTML = newsletterHTML + footerHTML + toastHTML;
    }

    /* Active nav link */
    const page = location.pathname.split('/').pop().replace('.html', '') || 'index';
    document.querySelectorAll('.navbar__links a[data-page]').forEach(function (a) {
      if (a.getAttribute('data-page') === page) a.classList.add('active');
    });

    /* Topbar dismiss */
    const topbar = document.getElementById('topbar');
    const closeBtn = document.getElementById('topbarClose');
    if (topbar && closeBtn) {
      if (sessionStorage.getItem('topbarDismissed')) topbar.style.display = 'none';
      closeBtn.addEventListener('click', function () {
        topbar.style.opacity = '0';
        setTimeout(function () { topbar.style.display = 'none'; }, 300);
        sessionStorage.setItem('topbarDismissed', '1');
      });
    }

    /* Hamburger menu */
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    if (hamburger && mobileNav) {
      hamburger.addEventListener('click', function () {
        const isOpen = mobileNav.classList.toggle('open');
        const spans = hamburger.querySelectorAll('span');
        if (isOpen) {
          spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
          spans[1].style.opacity   = '0';
          spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
          spans.forEach(function (s) { s.style.transform = ''; s.style.opacity = ''; });
        }
      });

      /* Close mobile nav when a link is clicked */
      mobileNav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          mobileNav.classList.remove('open');
          hamburger.querySelectorAll('span').forEach(function (s) {
            s.style.transform = ''; s.style.opacity = '';
          });
        });
      });
    }

    /* Navbar scroll shadow */
    var navbar = document.getElementById('navbar');
    if (navbar) {
      window.addEventListener('scroll', function () {
        navbar.classList.toggle('scrolled', window.scrollY > 10);
      }, { passive: true });
    }
  }

  /* Scripts are loaded at bottom of <body> — DOM is ready, just run */
  initLayout();

})();