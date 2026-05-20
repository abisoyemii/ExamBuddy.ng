/* ============================================================
   ExamBuddy Nigeria — shared-layout.js
   Injects topbar, navbar, newsletter & footer into every page
   ============================================================ */

(function () {

  /* ---- Topbar ---- */
  const topbarHTML = `
  <div class="topbar" id="topbar">
    <span>📣 WAEC 2026 examinations are coming soon! <a href="/waec/">Get our free preparation guide and stay ahead &rarr;</a></span>
    <button class="topbar__close" id="topbarClose" aria-label="Dismiss announcement">&#10005;</button>
  </div>`;

  /* ---- Navbar ---- */
  const navHTML = `
<nav class="navbar" id="navbar">
  <div class="navbar__inner">
    <a href="/" class="navbar__logo">
      <img src="/images/logo.png" alt="ExamBuddy Nigeria" style="height:42px;width:auto;display:block;">
    </a>
    <div class="navbar__links">
      <a href="/"          data-page="index">Home</a>
      <a href="/waec/"           data-page="waec">WAEC</a>
      <a href="/jamb/"           data-page="jamb">JAMB</a>
      <a href="/sat/"            data-page="sat">SAT</a>
      <a href="/nysc/"           data-page="nysc">NYSC</a>
      <a href="/neco/"           data-page="neco">NECO</a>
      <a href="/ielts/"          data-page="ielts">IELTS</a>
      <a href="/cutoff-marks/"   data-page="cutoff-marks">Cut-off Marks</a>
      <a href="/blog/"           data-page="blog">Blog</a>
      <a href="/exam-portals/"   data-page="exam-portals">Portals</a>
      <a href="/about/"          data-page="about">About</a>
    </div>

    <!-- Auth buttons — always rendered, supabase.js controls visibility -->
    <div class="navbar__cta">

      <!-- Always visible -->
      <a href="/exam-portals/" class="btn btn--outline btn--sm">🔗 Exam Portals</a>

      <!-- Logged OUT state -->
      <a href="/login/" id="eb-login-btn" class="btn btn--blue btn--sm" style="display:flex;align-items:center;gap:6px;">
        👤 Log In
      </a>

      <!-- Logged IN state (hidden until auth resolves) -->
      <a href="/dashboard/" id="eb-dashboard-btn" class="btn btn--blue btn--sm" style="display:none;align-items:center;gap:6px;">
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
    <a href="/">🏠 Home</a>
    <a href="/waec/">📝 WAEC</a>
    <a href="/jamb/">🎯 JAMB</a>
    <a href="/nysc/">🏕️ NYSC</a>
    <a href="/neco/">📋 NECO</a>
    <a href="/ielts/">🌍 IELTS</a>
    <a href="/cutoff-marks/">📊 Cut-off Marks 2026</a>
    <a href="/blog/">✍️ Blog</a>
    <a href="/exam-portals/">🌐 Portals</a>
    <a href="/about/">ℹ️ About</a>
    <a href="/dashboard/">📊 My Dashboard</a>
    <a href="/contact/">📧 Contact</a>
    <div style="border-top:1px solid #E2E8F0;margin:8px 0;"></div>
    <a href="/login/" id="mob-login-btn" class="btn btn--primary">👤 Log In / Sign Up</a>
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
            <li><a href="/waec/">WAEC Guide</a></li>
            <li><a href="/jamb/">JAMB Guide</a></li>
            <li><a href="/nysc/">NYSC Guide</a></li>
            <li><a href="/neco/">NECO Guide</a></li>
            <li><a href="/ielts/">IELTS Guide</a></li>
            <li><a href="/cutoff-marks/">Cut-off Marks 2026</a></li>
            <li><a href="/exam-portals/">Exam Portals</a></li>
          </ul>
        </div>
        <div class="footer__col">
          <h5>Resources</h5>
          <ul>
            <li><a href="/study-resources/">Free Downloads</a></li>
            <li><a href="/past-questions/">Past Questions</a></li>
            <li><a href="/cutoff-marks/">Cut-off Marks</a></li>
            <li><a href="/study-resources/">Study Timetables</a></li>
            <li><a href="/blog/">Blog &amp; Articles</a></li>
          </ul>
        </div>
        <div class="footer__col">
          <h5>Company</h5>
          <ul>
            <li><a href="/about/">About Us</a></li>
            <li><a href="/contact/">Contact</a></li>
            <li><a href="/privacy/">Privacy Policy</a></li>
            <li><a href="/disclaimer/">Disclaimer</a></li>
          </ul>
        </div>
      </div>
      <div class="footer__bottom">
        <span>© 2026 ExamBuddy Nigeria · Not affiliated with WAEC, JAMB, NYSC, or NECO</span>
        <div class="footer__bottom-links">
          <a href="/privacy/">Privacy Policy</a>
          <a href="/disclaimer/">Disclaimer</a>
          <a href="/contact/">Contact</a>
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
    const rawPath = location.pathname.replace(/\/$/, ''); const pageName = rawPath.split('/').pop(); const page = pageName === '' ? 'index' : pageName.replace('.html', '');
    const pageAlias = {
      'blog-hub': 'blog',
      'news-hub': 'blog',
      'jamb-registration-guide': 'jamb',
      'utme-tips-300-plus': 'jamb',
      'post-utme-guide': 'jamb',
      'common-utme-mistakes': 'jamb',
      'university-admission-updates': 'cutoff-marks',
      'campus-gist': 'nysc'
    };
    const activePage = pageAlias[page] || page;
    document.querySelectorAll('.navbar__links a[data-page]').forEach(function (a) {
      if (a.getAttribute('data-page') === activePage) a.classList.add('active');
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

    /* ── Auth UI update ── */
    window.ebUpdateAuthUI = function (user) {
      const loginBtn     = document.getElementById('eb-login-btn');
      const logoutBtn    = document.getElementById('eb-logout-btn');
      const dashBtn      = document.getElementById('eb-dashboard-btn');
      const mobLoginBtn  = document.getElementById('mob-login-btn');
      const mobLogoutBtn = document.getElementById('mob-logout-btn');

      if (user) {
        if (loginBtn)     loginBtn.style.display     = 'none';
        if (logoutBtn)    logoutBtn.style.display     = 'flex';
        if (dashBtn)      dashBtn.style.display       = 'flex';
        if (mobLoginBtn)  mobLoginBtn.style.display   = 'none';
        if (mobLogoutBtn) mobLogoutBtn.style.display  = 'flex';
      } else {
        if (loginBtn)     loginBtn.style.display      = 'flex';
        if (logoutBtn)    logoutBtn.style.display      = 'none';
        if (dashBtn)      dashBtn.style.display        = 'none';
        if (mobLoginBtn)  mobLoginBtn.style.display    = 'flex';
        if (mobLogoutBtn) mobLogoutBtn.style.display   = 'none';
      }
    };

    window.ebUpdateAuthUI(null);
  }

  initLayout();

})();