/* ============================================================
   ExamBuddy Nigeria — shared-layout.js
   Injects topbar, navbar, newsletter & footer into every page
   All paths relative to root level (flat structure)
   ============================================================ */

(function () {
  /* ---- Topbar ---- */
  const topbarHTML = `
  <div class="topbar" id="topbar">
    <span>🎯 JAMB 2026 Registration is open! Check cut-off marks and requirements &rarr;
      <a href="jamb.html">Read our JAMB Guide</a>
    </span>
    <button class="topbar__close" id="topbarClose" aria-label="Dismiss announcement">&#10005;</button>
  </div>`;

  /* ---- Navbar ---- */
  const navHTML = `
  <nav class="navbar" id="navbar">
    <div class="navbar__inner">
      <a href="index.html" class="navbar__logo">
        <img src="images/logo.png">
      </a>
      <div class="navbar__links">
        <a href="index.html" data-page="index">Home</a>
        <a href="waec.html" data-page="waec">WAEC</a>
        <a href="jamb.html" data-page="jamb">JAMB</a>
        <a href="nysc.html" data-page="nysc">NYSC</a>
        <a href="neco.html" data-page="neco">NECO</a>
         <a href="ielts.html" data-page="ielts">IELTS</a>

        <a href="study-resources.html" data-page="study-resources">Resources</a>
        <a href="blog.html" data-page="blog">Blog</a>
        <a href="exam-portals.html" data-page="exam-portals">Portals</a>
        <a href="about.html" data-page="about">About</a>
      </div>
      <div class="navbar__cta">
        <a href="exam-portals.html" class="btn btn--primary btn--sm">Exam Portals &rarr;</a>
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
      <a href="blog.html">✍️ Blog</a>
      <a href="exam-portals.html">🌐 Portals</a>
      <a href="about.html">ℹ️ About</a>
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
             <li><a href="ielts.html">IELTS Guide</a></li>

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

  /* defer guarantees DOM is parsed — but guard against edge cases */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLayout);
  } else {
    initLayout();
  }

})();

/* ===== HERO ORB ANIMATION — ADD TO YOUR script.js (or before </body>) ===== */

(function () {
  const canvas = document.getElementById('orb-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const W  = canvas.width;
  const H  = canvas.height;
  const CX = W / 2;
  const CY = H / 2;
  const R  = W * 0.46;

  let tick = 0;

  const BLUE_DARK  = { r: 10,  g: 36,  b: 99  };
  const BLUE_MID   = { r: 27,  g: 79,  b: 216 };
  const GREEN_MAIN = { r: 5,   g: 150, b: 105 };
  const GREEN_LT   = { r: 16,  g: 185, b: 129 };
  const TEAL       = { r: 15,  g: 118, b: 110 };

  function rgba(c, a) { return `rgba(${c.r},${c.g},${c.b},${a})`; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function lerpC(a, b, t) {
    return { r: lerp(a.r, b.r, t), g: lerp(a.g, b.g, t), b: lerp(a.b, b.b, t) };
  }

  function drawSphere() {
    const t    = (Math.sin(tick * 0.008) + 1) / 2;
    const glow = lerpC(GREEN_MAIN, BLUE_MID, t);
    const grad = ctx.createRadialGradient(
      CX - R * 0.25, CY - R * 0.25, R * 0.05,
      CX, CY, R
    );
    grad.addColorStop(0.0,  rgba(GREEN_LT,  0.95));
    grad.addColorStop(0.25, rgba(glow,       0.85));
    grad.addColorStop(0.55, rgba(BLUE_MID,   0.7));
    grad.addColorStop(0.78, rgba(BLUE_DARK,  0.9));
    grad.addColorStop(1.0,  rgba(BLUE_DARK,  1.0));
    ctx.beginPath();
    ctx.arc(CX, CY, R, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  }

  function drawPetals() {
    const numPetals = 4;
    const rot = tick * 0.004;
    for (let i = 0; i < numPetals; i++) {
      const angle     = (i / numPetals) * Math.PI * 2 + rot;
      const nextAngle = ((i + 1) / numPetals) * Math.PI * 2 + rot;
      const t         = (Math.sin(tick * 0.006 + i) + 1) / 2;
      const petalColor = lerpC(GREEN_MAIN, TEAL, t);
      const alpha      = 0.55 + 0.2 * Math.sin(tick * 0.01 + i * 1.3);
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(CX, CY);
      ctx.quadraticCurveTo(
        CX + Math.cos(angle - 0.3) * R * 0.95,
        CY + Math.sin(angle - 0.3) * R * 0.95,
        CX + Math.cos(angle + Math.PI / numPetals) * R * 0.88,
        CY + Math.sin(angle + Math.PI / numPetals) * R * 0.88
      );
      ctx.quadraticCurveTo(
        CX + Math.cos(nextAngle + 0.3) * R * 0.95,
        CY + Math.sin(nextAngle + 0.3) * R * 0.95,
        CX, CY
      );
      const clip = new Path2D();
      clip.arc(CX, CY, R - 2, 0, Math.PI * 2);
      ctx.clip(clip);
      ctx.fillStyle = rgba(petalColor, alpha);
      ctx.fill();
      ctx.restore();
    }
  }

  function drawCore() {
    const pulse = 0.35 + 0.12 * Math.sin(tick * 0.012);
    const grad  = ctx.createRadialGradient(CX, CY, 0, CX, CY, R * pulse);
    grad.addColorStop(0,   rgba(GREEN_LT,   0.9));
    grad.addColorStop(0.4, rgba(GREEN_MAIN, 0.45));
    grad.addColorStop(1,   rgba(GREEN_MAIN, 0));
    ctx.save();
    const clip = new Path2D();
    clip.arc(CX, CY, R - 2, 0, Math.PI * 2);
    ctx.clip(clip);
    ctx.beginPath();
    ctx.arc(CX, CY, R * pulse, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();
  }

  function drawShine() {
    const shineX = CX - R * 0.28;
    const shineY = CY - R * 0.28;
    const grad   = ctx.createRadialGradient(shineX, shineY, 0, shineX, shineY, R * 0.42);
    grad.addColorStop(0,   'rgba(255,255,255,0.28)');
    grad.addColorStop(0.5, 'rgba(255,255,255,0.06)');
    grad.addColorStop(1,   'rgba(255,255,255,0)');
    ctx.save();
    const clip = new Path2D();
    clip.arc(CX, CY, R - 2, 0, Math.PI * 2);
    ctx.clip(clip);
    ctx.beginPath();
    ctx.arc(shineX, shineY, R * 0.42, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();
  }

  function drawRim() {
    const grad = ctx.createRadialGradient(CX, CY, R * 0.72, CX, CY, R);
    grad.addColorStop(0, 'rgba(0,0,0,0)');
    grad.addColorStop(1, 'rgba(0,0,0,0.55)');
    ctx.save();
    const clip = new Path2D();
    clip.arc(CX, CY, R, 0, Math.PI * 2);
    ctx.clip(clip);
    ctx.beginPath();
    ctx.arc(CX, CY, R, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.restore();
  }

  function drawGlowRing() {
    const t     = (Math.sin(tick * 0.007) + 1) / 2;
    const alpha = 0.08 + 0.06 * t;
    const grad  = ctx.createRadialGradient(CX, CY, R * 0.9, CX, CY, R * 1.25);
    grad.addColorStop(0, rgba(GREEN_LT,   alpha));
    grad.addColorStop(1, rgba(GREEN_MAIN, 0));
    ctx.beginPath();
    ctx.arc(CX, CY, R * 1.25, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  }

  function loop() {
    tick++;
    ctx.clearRect(0, 0, W, H);
    drawGlowRing();
    drawSphere();
    drawPetals();
    drawCore();
    drawRim();
    drawShine();
    requestAnimationFrame(loop);
  }

  loop();
})();