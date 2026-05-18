/* ============================================================
   ExamBuddy Nigeria — shared-layout.js
   Injects topbar, navbar, newsletter & footer into every page
   ============================================================ */

(function () {

  /* ---- Topbar ---- */
  const topbarHTML = `
  <div class="topbar" id="topbar">
    <span>📣 WAEC 2026 examinations are coming soon! <a href="waec.html">Get our free preparation guide and stay ahead e&rarr;</a></span>
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
      <a href="cutoff-marks.html"   data-page="cutoff-marks">Cut-off Marks</a>
      <a href="blog.html"           data-page="blog">Blog</a>
      <a href="exam-portals.html"   data-page="exam-portals">Portals</a>
      <a href="about.html"          data-page="about">About</a>
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
    <a href="cutoff-marks.html">📊 Cut-off Marks 2026</a>
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
            <li><a href="cutoff-marks.html">Cut-off Marks 2026</a></li>
            <li><a href="exam-portals.html">Exam Portals</a></li>
          </ul>
        </div>
        <div class="footer__col">
          <h5>Resources</h5>
          <ul>
            <li><a href="study-resources.html">Free Downloads</a></li>
            <li><a href="past-questions.html">Past Questions</a></li>
            <li><a href="cutoff-marks.html">Cut-off Marks</a></li>
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
        <span>© 2026 ExamBuddy Nigeria · Not affiliated with WAEC, JAMB, NYSC, or NECO</span>
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
  injectSchema();

})();


/* ============================================================
   Schema Injection — auto-adds JSON-LD to every page
   based on the current page filename
============================================================ */
function injectSchema() {
  const page = location.pathname.split('/').pop().replace('.html', '') || 'index';

  const schemas = {

    'index': [
      {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "name": "ExamBuddy Nigeria",
        "url": "https://exambuddy.ng",
        "logo": "https://exambuddy.ng/images/logo.png",
        "description": "Free WAEC, JAMB, NECO and NYSC exam preparation guides for Nigerian students.",
        "address": { "@type": "PostalAddress", "addressCountry": "NG" }
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "ExamBuddy Nigeria",
        "url": "https://exambuddy.ng",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://exambuddy.ng/blog.html?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }
    ],

    'jamb': {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the JAMB cut-off mark for federal universities in 2026?",
          "acceptedAnswer": { "@type": "Answer", "text": "The JAMB national minimum cut-off mark for federal universities in 2026 is 160. However, individual universities set higher departmental cut-offs — ranging from 200 to 280+ for competitive courses like Medicine and Law." }
        },
        {
          "@type": "Question",
          "name": "How do I register for JAMB UTME 2026?",
          "acceptedAnswer": { "@type": "Answer", "text": "To register for JAMB 2026: obtain your NIN from NIMC, send your NIN to 55019 to get your profile code, purchase the JAMB e-PIN from approved banks, then visit an accredited CBT centre to complete registration with biometric data." }
        },
        {
          "@type": "Question",
          "name": "How many questions are in JAMB UTME?",
          "acceptedAnswer": { "@type": "Answer", "text": "JAMB UTME has 180 questions across 4 subjects including Use of English. The exam duration is 2 hours, giving approximately 40 seconds per question. Maximum score is 400." }
        },
        {
          "@type": "Question",
          "name": "What is Use of English in JAMB?",
          "acceptedAnswer": { "@type": "Answer", "text": "Use of English is a compulsory subject for all JAMB candidates. It carries 100 marks out of 400 and covers comprehension, lexis and structure, oral English, and the JAMB prescribed novel." }
        },
        {
          "@type": "Question",
          "name": "Can I change my course or institution after JAMB registration?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. JAMB allows one change of institution and course for a fee through the e-Facility portal at efacility.jamb.org.ng. Changes must be made before the exam date." }
        }
      ]
    },

    'waec': {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How many subjects do I need to pass for university admission in WAEC?",
          "acceptedAnswer": { "@type": "Answer", "text": "You need a minimum of 5 credits (grade C6 or above) including English Language and Mathematics for most Nigerian university admissions." }
        },
        {
          "@type": "Question",
          "name": "What is the WAEC grading system?",
          "acceptedAnswer": { "@type": "Answer", "text": "WAEC grades range from A1 (75-100%, Excellent) to F9 (0-39%, Fail). Credits are C6 and above (50-100%). Universities require at least 5 credits including English and Mathematics." }
        },
        {
          "@type": "Question",
          "name": "When are WAEC results released?",
          "acceptedAnswer": { "@type": "Answer", "text": "WAEC results are usually released 45-90 days after the examination. You can check your results online at waecdirect.org using your exam number, exam year, and exam type." }
        },
        {
          "@type": "Question",
          "name": "Can I resit WAEC if I fail a subject?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. You can resit as a private candidate in the next WAEC sitting (November/December). Your previous passes are not lost — you can combine results from different sittings." }
        },
        {
          "@type": "Question",
          "name": "Is November/December WAEC accepted by universities?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes, the Nov/Dec WAEC for private candidates is accepted by Nigerian universities. Always confirm specific requirements directly with your chosen institution." }
        }
      ]
    },

    'neco': {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is NECO accepted for university admission in Nigeria?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. NECO results are accepted by all Nigerian universities, JAMB, and most employers for the same purposes as WAEC. You need 5 credits including English and Mathematics." }
        },
        {
          "@type": "Question",
          "name": "What is the difference between WAEC and NECO?",
          "acceptedAnswer": { "@type": "Answer", "text": "WAEC is conducted by the West African Examinations Council and is regional, while NECO is conducted by the National Examinations Council and is Nigeria-specific. Both are accepted for university admissions. WAEC has a May/June sitting; NECO has a June/July sitting." }
        },
        {
          "@type": "Question",
          "name": "How do I check my NECO result?",
          "acceptedAnswer": { "@type": "Answer", "text": "Visit neco.gov.ng and use your exam number and a scratch card token to check your NECO result online." }
        }
      ]
    },

    'nysc': {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How long is NYSC orientation camp?",
          "acceptedAnswer": { "@type": "Answer", "text": "NYSC orientation camp lasts 3 weeks. During this period, corps members undergo physical drills, skill acquisition programmes, and orientation activities before being posted to their Place of Primary Assignment (PPA)." }
        },
        {
          "@type": "Question",
          "name": "How much is NYSC monthly allowance (allawee)?",
          "acceptedAnswer": { "@type": "Answer", "text": "The NYSC monthly allowance (allawee) is currently ₦77,000 as of 2026, paid by the federal government. Some state governments and private employers top this up with additional allowances." }
        },
        {
          "@type": "Question",
          "name": "How do I apply for NYSC redeployment?",
          "acceptedAnswer": { "@type": "Answer", "text": "Apply for redeployment through the NYSC online portal. Medical redeployment requires a certified medical report. State-of-residence redeployment is available for married corps members and those with documented hardship." }
        },
        {
          "@type": "Question",
          "name": "What happens if I miss NYSC camp?",
          "acceptedAnswer": { "@type": "Answer", "text": "Missing NYSC camp without an approved reason can lead to being listed as an absconder, which affects your discharge certificate. Contact NYSC immediately if you cannot attend your scheduled camp batch." }
        }
      ]
    },

    'blog': {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "ExamBuddy Nigeria Blog",
      "description": "Free study guides, exam tips and strategies for Nigerian students preparing for JAMB, WAEC, NECO and NYSC.",
      "url": "https://exambuddy.ng/blog.html",
      "publisher": {
        "@type": "Organization",
        "name": "ExamBuddy Nigeria",
        "url": "https://exambuddy.ng"
      }
    },

    'cutoff-marks': {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the minimum JAMB score for federal universities in 2026?",
          "acceptedAnswer": { "@type": "Answer", "text": "The JAMB national minimum cut-off mark for federal universities is 160. Most competitive federal universities set their own cut-off at 180-200. Always aim for 200+ to remain competitive." }
        },
        {
          "@type": "Question",
          "name": "What is UNILAG cut off mark for 2026?",
          "acceptedAnswer": { "@type": "Answer", "text": "UNILAG general cut-off is 200. Departmental cut-offs are higher: Medicine 280+, Law 250+, Engineering 240+, Computer Science 230+." }
        },
        {
          "@type": "Question",
          "name": "What is UI cut off mark for 2026?",
          "acceptedAnswer": { "@type": "Answer", "text": "University of Ibadan general cut-off is 200. Medicine requires 280+, Veterinary Medicine 260+, Law 240+, Engineering 230+." }
        },
        {
          "@type": "Question",
          "name": "What is the cut off mark for state universities in Nigeria?",
          "acceptedAnswer": { "@type": "Answer", "text": "Most state universities accept a minimum JAMB score of 140-160. Competitive state schools like LASU may require 160-180 as a general cut-off." }
        }
      ]
    },

    'unilag-cutoff': {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is UNILAG cut off mark for 2026?",
          "acceptedAnswer": { "@type": "Answer", "text": "UNILAG general cut-off is 200. Medicine requires 280+, Law 250+, Engineering 240+, Computer Science 230+." }
        },
        {
          "@type": "Question",
          "name": "Can I get into UNILAG with 200?",
          "acceptedAnswer": { "@type": "Answer", "text": "200 qualifies you for Post-UTME but most departments require 220+. Only less competitive courses like Education accept scores close to the general cut-off." }
        }
      ]
    },

    'ui-cutoff': {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is University of Ibadan cut off mark for 2026?",
          "acceptedAnswer": { "@type": "Answer", "text": "UI general cut-off is 200. Medicine requires 280+, Veterinary Medicine 260+, Law 240+, Engineering 230+." }
        }
      ]
    },

    'oau-cutoff': {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is OAU cut off mark for 2026?",
          "acceptedAnswer": { "@type": "Answer", "text": "OAU general cut-off is 200. Medicine requires 270+, Pharmacy 260+, Law 240+, Engineering 230+." }
        }
      ]
    },

    'abu-cutoff': {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is ABU Zaria cut off mark for 2026?",
          "acceptedAnswer": { "@type": "Answer", "text": "ABU Zaria general cut-off is 180. Medicine requires 260+, Law 230+, Engineering 220+." }
        }
      ]
    },

    'uniben-cutoff': {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is UNIBEN cut off mark for 2026?",
          "acceptedAnswer": { "@type": "Answer", "text": "UNIBEN general cut-off is 180. Medicine requires 260+, Pharmacy 250+, Law 230+, Engineering 220+." }
        }
      ]
    },

    'about': {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About ExamBuddy Nigeria",
      "url": "https://exambuddy.ng/about.html",
      "description": "ExamBuddy Nigeria is a free exam preparation platform built by Nigerian graduates to help students ace WAEC, JAMB, NECO and NYSC.",
      "publisher": { "@type": "Organization", "name": "ExamBuddy Nigeria", "url": "https://exambuddy.ng" }
    },

    'contact': {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact ExamBuddy Nigeria",
      "url": "https://exambuddy.ng/contact.html"
    },

    'study-resources': {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Free Study Resources – ExamBuddy Nigeria",
      "description": "Free downloadable JAMB and WAEC past questions, study timetables, syllabus PDFs and formula sheets for Nigerian students.",
      "url": "https://exambuddy.ng/study-resources.html"
    },

    'exam-portals': {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Nigerian Exam Portals – WAEC, JAMB, NYSC, NECO | ExamBuddy",
      "description": "Direct links to official Nigerian exam portals: WAEC, JAMB, NYSC and NECO.",
      "url": "https://exambuddy.ng/exam-portals.html"
    },

    'past-questions': {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "JAMB & WAEC Past Questions – Free CBT Practice | ExamBuddy Nigeria",
      "description": "Practice JAMB and WAEC past questions free. CBT mode with instant scoring and explanations.",
      "url": "https://exambuddy.ng/past-questions.html"
    },

    'pq-jamb': {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "JAMB Past Questions 2014–2026 – Free CBT Practice | ExamBuddy Nigeria",
      "description": "Practice JAMB UTME past questions from 2014 to 2026 in CBT mode. 12 subjects, instant scoring, detailed explanations.",
      "url": "https://exambuddy.ng/pq-jamb.html"
    },

    'pq-waec': {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "WAEC Past Questions 2015–2026 – Free CBT Practice | ExamBuddy Nigeria",
      "description": "Practice WAEC past questions in CBT mode. 8 subjects, instant feedback, detailed answer explanations.",
      "url": "https://exambuddy.ng/pq-waec.html"
    },

    'ielts': {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What IELTS score do I need for UK universities?",
          "acceptedAnswer": { "@type": "Answer", "text": "Most UK universities require an overall IELTS band score of 6.0 to 7.0 depending on the course. Competitive programmes like Medicine and Law often require 7.0 or above with no band below 6.5." }
        },
        {
          "@type": "Question",
          "name": "How long is IELTS valid?",
          "acceptedAnswer": { "@type": "Answer", "text": "IELTS results are valid for 2 years from the date of the test. After 2 years, you must retake the test if you need a current score for visa or university applications." }
        }
      ]
    }

  };

  // Get schema for current page (or skip if none defined)
  const schema = schemas[page];
  if (!schema) return;

  // Inject — supports both single object and array of schemas
  const items = Array.isArray(schema) ? schema : [schema];
  items.forEach(function(s) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(s);
    document.head.appendChild(script);
  });
}