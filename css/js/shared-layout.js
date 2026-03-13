/* ============================================================
   ExamBuddy Nigeria — shared-layout.js
   Injects topbar, navbar, newsletter & footer into every page
   ============================================================ */

(function () {

  /* ---- Topbar ---- */
  const topbarHTML = `
  <div class="topbar" id="topbar">
    <span>📣 JAMB 2026 registration is now open! <a href="jamb.html">Get our free preparation guide &rarr;</a></span>
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
      <a href="index.html"          data-page="index">Home</a>
      <a href="waec.html"           data-page="waec">WAEC</a>
      <a href="jamb.html"           data-page="jamb">JAMB</a>
      <a href="nysc.html"           data-page="nysc">NYSC</a>
      <a href="neco.html"           data-page="neco">NECO</a>
      <a href="ielts.html"          data-page="ielts">IELTS</a>
      <a href="blog.html"           data-page="blog">Blog</a>
      <a href="exam-portals.html"   data-page="exam-portals">Portals</a>
      <a href="about.html"          data-page="about">About</a>
      <a href="dashboard.html"      data-page="dashboard">Dashboard</a>
    </div>

    <!-- Auth buttons — always rendered, supabase.js controls visibility -->
    <div class="navbar__cta" style="display:flex;align-items:center;gap:10px;">
      

      <!-- Always visible -->
      <a href="exam-portals.html" class="btn btn--outline btn--sm">🔗 Exam Portals</a>

      <!-- Logged OUT state -->
      <a href="login.html" id="eb-login-btn" class="btn btn--blue btn--sm" style="display:flex;align-items:center;gap:6px;">
        👤 Log In
      </a>

      <!-- Logged IN state (hidden until auth resolves) -->
      <a href="dashboard.html" id="eb-dashboard-btn" class="btn btn--blue btn--sm" style="display:none;align-items:center;gap:6px;">
        📊 Dashboard
      </a>
      <button onclick="ebSignOut()" id="eb-logout-btn" class="btn btn--sm" style="display:none;align-items:center;gap:6px;background:#F1F5F9;color:#0A2463;border:1px solid #E2E8F0;">
        🚪 Log Out
      </button>
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
    <a href="ielts.html">🌍 IELTS</a>
    <a href="blog.html">✍️ Blog</a>
    <a href="exam-portals.html">🌐 Portals</a>
    <a href="about.html">ℹ️ About</a>
    <a href="dashboard.html">📊 My Dashboard</a>
    <a href="contact.html">📧 Contact</a>
    <div style="border-top:1px solid #E2E8F0;margin:8px 0;"></div>
    <a href="login.html" id="mob-login-btn" class="btn btn--primary">👤 Log In / Sign Up</a>
    <button onclick="ebSignOut()" id="mob-logout-btn" class="btn btn--primary" style="display:none;">🚪 Log Out</button>
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
      <form class="newsletter-form" onsubmit="event.preventDefault();window.showToast&&showToast('🎉 Subscribed! Watch your inbox.')">
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
          <p>Your ultimate Nigerian exam companion. Free guides, resources, and direct links to official portals for WAEC, JAMB, NYSC, NECO, IELTS, and more.</p>
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
            <li><a href="ielts.html">IELTS Guide</a></li>
            <li><a href="exam-portals.html">Exam Portals</a></li>
          </ul>
        </div>
        <div class="footer__col">
          <h5>Resources</h5>
          <ul>
            <li><a href="study-resources.html">Free Downloads</a></li>
            <li><a href="past-questions.html">Past Questions</a></li>
            <li><a href="study-resources.html">Study Timetables</a></li>
            <li><a href="blog.html">Blog &amp; Articles</a></li>
          </ul>
        </div>
        <div class="footer__col">
          <h5>Company</h5>
          <ul>
            <li><a href="about.html">About Us</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="privacy.html">Privacy Policy</a></li>
            <li><a href="disclaimer.html">Disclaimer</a></li>
          </ul>
        </div>
      </div>
      <div class="footer__bottom">
        <span>© 2025 ExamBuddy Nigeria · Not affiliated with WAEC, JAMB, NYSC, or NECO</span>
        <div class="footer__bottom-links">
          <a href="privacy.html">Privacy Policy</a>
          <a href="disclaimer.html">Disclaimer</a>
          <a href="contact.html">Contact</a>
        </div>
      </div>
    </div>
  </footer>`;

  /* ---- Toast ---- */
  const toastHTML = `<div class="toast" id="toast"></div>`;

  /* ======================================================
     INIT — inject HTML then wire up interactions
  ====================================================== */
  function initLayout() {
    const navRoot    = document.getElementById('nav-root');
    const footerRoot = document.getElementById('footer-root');

    if (navRoot)    navRoot.innerHTML    = topbarHTML + navHTML;
    if (footerRoot) footerRoot.innerHTML = newsletterHTML + footerHTML + toastHTML;

    /* ── Active nav link ── */
    const page = location.pathname.split('/').pop().replace('.html', '') || 'index';
    document.querySelectorAll('.navbar__links a[data-page]').forEach(function (a) {
      if (a.getAttribute('data-page') === page) a.classList.add('active');
    });

    /* ── Topbar dismiss ── */
    const topbar   = document.getElementById('topbar');
    const closeBtn = document.getElementById('topbarClose');
    if (topbar && closeBtn) {
      if (sessionStorage.getItem('topbarDismissed')) topbar.style.display = 'none';
      closeBtn.addEventListener('click', function () {
        topbar.style.opacity = '0';
        setTimeout(function () { topbar.style.display = 'none'; }, 300);
        sessionStorage.setItem('topbarDismissed', '1');
      });
    }

    /* ── Hamburger menu ── */
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobileNav');
    if (hamburger && mobileNav) {
      hamburger.addEventListener('click', function () {
        const isOpen = mobileNav.classList.toggle('open');
        const spans  = hamburger.querySelectorAll('span');
        if (isOpen) {
          spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
          spans[1].style.opacity   = '0';
          spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
          spans.forEach(function (s) { s.style.transform = ''; s.style.opacity = ''; });
        }
      });

      mobileNav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          mobileNav.classList.remove('open');
          hamburger.querySelectorAll('span').forEach(function (s) {
            s.style.transform = ''; s.style.opacity = '';
          });
        });
      });
    }

    /* ── Navbar scroll shadow — throttled with rAF ── */
    var navbar  = document.getElementById('navbar');
    var ticking = false;
    if (navbar) {
      window.addEventListener('scroll', function () {
        if (!ticking) {
          requestAnimationFrame(function () {
            navbar.classList.toggle('scrolled', window.scrollY > 10);
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
    }

    /* ── Auth UI update ──
       Called by supabase.js after it resolves the session.
       Also called immediately here so the button is visible
       before supabase resolves (shows Log In by default). ── */
    window.ebUpdateAuthUI = function (user) {
      const loginBtn     = document.getElementById('eb-login-btn');
      const logoutBtn    = document.getElementById('eb-logout-btn');
      const dashBtn      = document.getElementById('eb-dashboard-btn');
      // const userNameEl   = document.getElementById('eb-user-name');
      const mobLoginBtn  = document.getElementById('mob-login-btn');
      const mobLogoutBtn = document.getElementById('mob-logout-btn');

      if (user) {
        /* Logged IN */
        const name = user.user_metadata?.full_name || user.email?.split('@')[0] || '';
        if (loginBtn)     loginBtn.style.display     = 'none';
        if (logoutBtn)    logoutBtn.style.display     = 'flex';
        if (dashBtn)      dashBtn.style.display       = 'flex';
        // if (userNameEl)   { userNameEl.textContent = '👋 ' + name; userNameEl.style.display = 'inline'; }
        if (mobLoginBtn)  mobLoginBtn.style.display   = 'none';
        if (mobLogoutBtn) mobLogoutBtn.style.display  = 'flex';
      } else {
        /* Logged OUT — default state */
        if (loginBtn)     loginBtn.style.display      = 'flex';
        if (logoutBtn)    logoutBtn.style.display      = 'none';
        if (dashBtn)      dashBtn.style.display        = 'none';
        // if (userNameEl)   { userNameEl.textContent = ''; userNameEl.style.display = 'none'; }
        if (mobLoginBtn)  mobLoginBtn.style.display    = 'flex';
        if (mobLogoutBtn) mobLogoutBtn.style.display   = 'none';
      }
    };

    /* Show logged-out state immediately (before supabase resolves) */
    window.ebUpdateAuthUI(null);
  }

  initLayout();

})();