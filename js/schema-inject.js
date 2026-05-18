/* ============================================================
   ExamBuddy Nigeria — schema-inject.js
   Auto-injects correct JSON-LD structured data per page.
   Add <script src="js/schema-inject.js"></script> to every page
   BEFORE </body>. Works alongside any existing schema in <head>.
   ============================================================ */

(function () {
  const page = location.pathname.split('/').pop().replace('.html', '') || 'index';
  const BASE = 'https://exambuddy.ng';

  /* ── Helper: inject a schema block ── */
  function inject(data) {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(data, null, 0);
    document.head.appendChild(s);
  }

  /* ── BreadcrumbList — used on almost every page ── */
  function breadcrumb(items) {
    inject({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': items.map((item, i) => ({
        '@type': 'ListItem',
        'position': i + 1,
        'name': item.name,
        'item': BASE + '/' + (item.url || '')
      }))
    });
  }

  /* ── FAQPage ── */
  function faq(questions) {
    inject({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': questions.map(q => ({
        '@type': 'Question',
        'name': q.q,
        'acceptedAnswer': { '@type': 'Answer', 'text': q.a }
      }))
    });
  }

  /* ── HowTo ── */
  function howto(name, description, steps) {
    inject({
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      'name': name,
      'description': description,
      'step': steps.map((s, i) => ({
        '@type': 'HowToStep',
        'position': i + 1,
        'name': s.name,
        'text': s.text
      }))
    });
  }

  /* ── Article / BlogPosting ── */
  function article(headline, description, datePublished) {
    inject({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      'headline': headline,
      'description': description,
      'datePublished': datePublished,
      'dateModified': '2026-03-01',
      'author': { '@type': 'Organization', 'name': 'ExamBuddy Nigeria' },
      'publisher': {
        '@type': 'Organization',
        'name': 'ExamBuddy Nigeria',
        'logo': { '@type': 'ImageObject', 'url': BASE + '/images/logo.png' }
      },
      'mainEntityOfPage': { '@type': 'WebPage', '@id': BASE + '/blog.html' }
    });
  }

  /* ══════════════════════════════════════════
     PAGE-SPECIFIC SCHEMA
  ══════════════════════════════════════════ */

  /* ── HOME ── */
  if (page === 'index' || page === '') {
    breadcrumb([{ name: 'Home', url: '' }]);
  }

  /* ── JAMB ── */
  if (page === 'jamb') {
    breadcrumb([
      { name: 'Home', url: '' },
      { name: 'JAMB Guide', url: 'jamb.html' }
    ]);
    faq([
      { q: 'How do I register for JAMB 2026?', a: 'To register for JAMB 2026, you need a National Identification Number (NIN). Send your NIN to 55019 via SMS to get a profile code, then purchase a JAMB e-PIN from approved banks and complete your registration at an accredited CBT centre.' },
      { q: 'What is the JAMB cut-off mark for federal universities in 2026?', a: 'The JAMB national minimum cut-off mark for federal universities is 160. However, most competitive universities set their own institutional cut-offs at 180–200, and departmental cut-offs are often 220–280+.' },
      { q: 'How many questions are in JAMB UTME?', a: 'JAMB UTME has 180 questions across 4 subjects including Use of English. The exam lasts 2 hours, giving you approximately 40 seconds per question.' },
      { q: 'What is the maximum score in JAMB?', a: 'The maximum score in JAMB UTME is 400, with 100 marks allocated to each of the 4 subjects.' },
      { q: 'What score do I need to get into university in Nigeria?', a: 'The national JAMB minimum for federal universities is 160. State universities typically require 140–160. However, competitive universities and departments require much higher scores — aim for 200+ for federal universities and 250+ for Medicine or Law.' },
      { q: 'Can I change my course or school after JAMB registration?', a: 'Yes. JAMB allows one change of institution and course for a fee through the JAMB e-Facility portal at efacility.jamb.org.ng. Changes must be made before the exam.' },
      { q: 'What is JAMB CAPS?', a: 'CAPS (Central Admissions Processing System) is the JAMB portal where universities offer admission and candidates accept or decline. After UTME results, log in to jamb.org.ng and check CAPS regularly. You must actively accept any admission offer before it expires.' },
      { q: 'How long are JAMB results valid?', a: 'JAMB results are only valid for the year they were obtained. You cannot use a previous year\'s result for a new academic session admission.' }
    ]);
    howto('How to Register for JAMB UTME 2026', 'Step-by-step guide to completing your JAMB UTME registration for the 2026 exam.', [
      { name: 'Get your NIN', text: 'Obtain your National Identification Number (NIN) from the nearest NIMC office or via the NIMC mobile app. This is mandatory for JAMB registration.' },
      { name: 'Create a JAMB profile', text: 'Send your NIN to 55019 via SMS to receive your profile code. You will also need a valid email address and phone number.' },
      { name: 'Purchase the JAMB e-PIN', text: 'Buy the JAMB registration e-PIN (currently ₦3,500) from approved banks, eTranzact outlets, or online via the JAMB e-Facility platform.' },
      { name: 'Complete registration at an accredited CBT centre', text: 'Visit an accredited JAMB CBT centre to complete your registration, provide biometric data, and choose your exam centre, institution, and course.' },
      { name: 'Print your exam slip and practise', text: 'Log in to jamb.org.ng to print your exam slip. Download the JAMB CBT practice app and practise regularly until your exam date.' }
    ]);
  }

  /* ── WAEC ── */
  if (page === 'waec') {
    breadcrumb([
      { name: 'Home', url: '' },
      { name: 'WAEC Guide', url: 'waec.html' }
    ]);
    faq([
      { q: 'What is the WAEC grading system in Nigeria?', a: 'WAEC uses grades A1 (75–100%, Excellent) through F9 (0–39%, Fail). Grades A1 to C6 (50–100%) are credit passes accepted for university admission. You need at least 5 credits including English Language and Mathematics for most university programmes.' },
      { q: 'How many subjects do I need to pass WAEC for university admission?', a: 'You need a minimum of 5 credits (C6 or above) including English Language and Mathematics. Specific courses may require credits in additional subjects — always check your intended university\'s requirements.' },
      { q: 'Can I check my WAEC result online?', a: 'Yes. Visit waecdirect.org and enter your exam number, exam year, and exam type to check your WAEC result online. Results are usually released 45–90 days after the examination.' },
      { q: 'When is WAEC 2026 exam?', a: 'WAEC SSCE (May/June) typically runs from April to June each year. The exact timetable is released by WAEC on their official website at waec.org.ng approximately 3 months before the exam begins.' },
      { q: 'How do I register for WAEC as a private candidate?', a: 'Visit the official WAEC website at waec.org.ng and follow the private candidate registration process. You will need to visit a WAEC office or approved registration centre with your documents and passport photographs.' },
      { q: 'Is WAEC Nov/Dec accepted by universities?', a: 'Yes, the November/December WAEC (for private candidates) is accepted by Nigerian universities. Some institutions or courses may have specific requirements — always verify with your target institution directly.' },
      { q: 'What happens if I fail a WAEC subject?', a: 'You can resit as a private candidate in the next WAEC sitting (November/December). Your previous passes are not lost — WAEC allows you to combine results from different sittings to meet admission requirements.' },
      { q: 'How long does it take to get WAEC results?', a: 'WAEC results are typically released 45 to 90 days after the last examination paper. You can check at waecdirect.org using your examination number.' }
    ]);
    howto('How to Pass WAEC SSCE in 2026', 'A proven strategy for passing WAEC SSCE with at least 5 credits in one sitting.', [
      { name: 'Download the WAEC syllabus', text: 'Get the official WAEC syllabus for each of your subjects from waec.org.ng. WAEC only tests topics within the syllabus — focus all your study on these topics.' },
      { name: 'Practice past questions', text: 'Work through at least 5 years of WAEC past questions for each subject. WAEC repeats question patterns consistently — familiarity with past questions is the single most effective preparation strategy.' },
      { name: 'Master Use of English daily', text: 'Practise essay writing, summary, and comprehension every day. English Language is compulsory and failed by many students due to poor technique, not lack of knowledge.' },
      { name: 'Create a 6-month study timetable', text: 'Build a realistic study schedule covering all your subjects 2–3 times before the exam. Prioritise your weakest subjects during your highest-energy study periods.' },
      { name: 'Simulate exam conditions', text: 'Practice completing full past papers within the official time limit. This builds speed, reduces anxiety, and shows you where to improve before the real exam.' }
    ]);
  }

  /* ── NYSC ── */
  if (page === 'nysc') {
    breadcrumb([
      { name: 'Home', url: '' },
      { name: 'NYSC Guide', url: 'nysc.html' }
    ]);
    faq([
      { q: 'What documents do I need for NYSC registration?', a: 'You need your degree certificate and transcript (originals and certified copies), NYSC online registration printout, call-up letter, NIN slip, passport photographs (bring at least 30), and your bank account details for allawee setup.' },
      { q: 'How long is NYSC orientation camp?', a: 'NYSC orientation camp lasts 3 weeks. During this period corps members undergo military drills, skills acquisition training, community development orientation, and administrative processes.' },
      { q: 'How much is NYSC allawee in 2026?', a: 'The NYSC monthly allowance (allawee) is ₦33,000 as set by the Federal Government. Some state governments top this up for corps members serving in their state.' },
      { q: 'How do I apply for NYSC redeployment?', a: 'Apply for redeployment through the NYSC portal at portal.nysc.gov.ng. Medical redeployment requires a certified medical report. Married corps members and those with documented hardship may apply for state-of-origin redeployment.' },
      { q: 'Can I serve in my state of origin for NYSC?', a: 'NYSC policy generally deploys corps members outside their state of origin and state of study. Serving in your home state is not guaranteed, though redeployment applications are considered for valid reasons including health and marriage.' }
    ]);
  }

  /* ── NECO ── */
  if (page === 'neco') {
    breadcrumb([
      { name: 'Home', url: '' },
      { name: 'NECO Guide', url: 'neco.html' }
    ]);
    faq([
      { q: 'Is NECO accepted for university admission in Nigeria?', a: 'Yes. NECO results are fully accepted by all Nigerian universities for admission purposes, on the same basis as WAEC results. You can also combine NECO and WAEC results to meet the required 5 credits.' },
      { q: 'What is the difference between WAEC and NECO?', a: 'WAEC (West African Examinations Council) is a regional body covering multiple West African countries, while NECO (National Examinations Council) is a Nigerian government body. Both are equally accepted for Nigerian university admission. NECO is generally considered slightly less competitive.' },
      { q: 'When is NECO exam 2026?', a: 'NECO SSCE (June/July) typically runs from June to July each year. The exact timetable is released on the official NECO website at neco.gov.ng.' },
      { q: 'Can I combine NECO and WAEC results for admission?', a: 'Yes. Nigerian universities accept combined WAEC and NECO results. If you passed 3 subjects in WAEC and 2 in NECO (including English and Maths), the combination can meet the 5-credit requirement.' }
    ]);
  }

  /* ── CUT-OFF MARKS (main page) ── */
  if (page === 'cutoff-marks') {
    breadcrumb([
      { name: 'Home', url: '' },
      { name: 'JAMB Cut-off Marks 2026', url: 'cutoff-marks.html' }
    ]);
    inject({
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      'name': 'JAMB Cut-off Marks 2026 — All Nigerian Universities',
      'description': 'Complete dataset of JAMB UTME minimum cut-off marks for all federal universities, state universities, polytechnics and colleges of education in Nigeria for 2026.',
      'url': BASE + '/cutoff-marks.html',
      'keywords': ['JAMB cut off marks', 'Nigerian universities', 'UTME minimum score', '2026'],
      'creator': { '@type': 'Organization', 'name': 'ExamBuddy Nigeria', 'url': BASE },
      'temporalCoverage': '2026'
    });
  }

  /* ── UNILAG CUT-OFF ── */
  if (page === 'unilag-cutoff') {
    breadcrumb([
      { name: 'Home', url: '' },
      { name: 'Cut-off Marks', url: 'cutoff-marks.html' },
      { name: 'UNILAG Cut-off 2026', url: 'unilag-cutoff.html' }
    ]);
  }

  /* ── UI CUT-OFF ── */
  if (page === 'ui-cutoff') {
    breadcrumb([
      { name: 'Home', url: '' },
      { name: 'Cut-off Marks', url: 'cutoff-marks.html' },
      { name: 'UI Cut-off 2026', url: 'ui-cutoff.html' }
    ]);
  }

  /* ── OAU CUT-OFF ── */
  if (page === 'oau-cutoff') {
    breadcrumb([
      { name: 'Home', url: '' },
      { name: 'Cut-off Marks', url: 'cutoff-marks.html' },
      { name: 'OAU Cut-off 2026', url: 'oau-cutoff.html' }
    ]);
  }

  /* ── ABU CUT-OFF ── */
  if (page === 'abu-cutoff') {
    breadcrumb([
      { name: 'Home', url: '' },
      { name: 'Cut-off Marks', url: 'cutoff-marks.html' },
      { name: 'ABU Cut-off 2026', url: 'abu-cutoff.html' }
    ]);
  }

  /* ── UNIBEN CUT-OFF ── */
  if (page === 'uniben-cutoff') {
    breadcrumb([
      { name: 'Home', url: '' },
      { name: 'Cut-off Marks', url: 'cutoff-marks.html' },
      { name: 'UNIBEN Cut-off 2026', url: 'uniben-cutoff.html' }
    ]);
  }

  /* ── BLOG ── */
  if (page === 'blog') {
    breadcrumb([
      { name: 'Home', url: '' },
      { name: 'Blog', url: 'blog.html' }
    ]);
    // BlogPosting schema for the 3 featured articles
    const articles = [
      {
        headline: 'How to Score 300+ in JAMB UTME 2026 — A Realistic, Step-by-Step Guide',
        description: 'No shortcuts — a structured, realistic approach to scoring 300 and above in JAMB UTME. Covers subject strategy, CBT tips, and time management.',
        date: '2026-01-15'
      },
      {
        headline: '10 Proven Strategies to Score A1 in WAEC English Language',
        description: 'Proven techniques from students who scored A1 — from essay structure and summary writing to comprehension tricks and time management.',
        date: '2026-02-01'
      },
      {
        headline: 'NYSC Camp Survival Guide: What Nobody Actually Tells You',
        description: 'Honest, practical advice for NYSC orientation camp — what to pack, what to expect, and how to stay comfortable for 3 weeks.',
        date: '2026-01-10'
      }
    ];
    articles.forEach(a => article(a.headline, a.description, a.date));
  }

  /* ── PAST QUESTIONS ── */
  if (page === 'pq-jamb') {
    breadcrumb([
      { name: 'Home', url: '' },
      { name: 'JAMB Past Questions', url: 'pq-jamb.html' }
    ]);
    inject({
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      'name': 'JAMB UTME Past Questions 2014–2026 — Free CBT Practice',
      'description': 'Practice JAMB UTME past questions from 2014 to 2026 across 12 subjects. Free CBT simulator with instant scoring and detailed answer explanations.',
      'url': BASE + '/pq-jamb.html',
      'educationalLevel': 'Secondary Education',
      'learningResourceType': 'Practice Problem',
      'teaches': 'JAMB UTME preparation',
      'provider': { '@type': 'Organization', 'name': 'ExamBuddy Nigeria', 'url': BASE },
      'isAccessibleForFree': true,
      'inLanguage': 'en-NG'
    });
    faq([
      { q: 'Are these real JAMB past questions?', a: 'Yes. ExamBuddy\'s JAMB CBT practice tool uses real past questions from official JAMB UTME examinations spanning 2014 to 2026, covering 12 subjects.' },
      { q: 'Is the JAMB past questions practice tool free?', a: 'Yes, completely free. No registration, no payment, no hidden charges. Access all past questions and CBT practice directly on ExamBuddy.' },
      { q: 'Which subjects are available for JAMB past questions practice?', a: 'ExamBuddy covers 12 JAMB subjects: Use of English, Mathematics, Biology, Chemistry, Physics, Economics, Government, Literature in English, Geography, Commerce, Accounting, and CRS/IRS.' }
    ]);
  }

  if (page === 'pq-waec') {
    breadcrumb([
      { name: 'Home', url: '' },
      { name: 'WAEC Past Questions', url: 'pq-waec.html' }
    ]);
    inject({
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      'name': 'WAEC Past Questions 2014–2026 — Free CBT Practice',
      'description': 'Practice WAEC SSCE past questions across 8 subjects. Free CBT simulator with instant scoring and detailed explanations.',
      'url': BASE + '/pq-waec.html',
      'educationalLevel': 'Secondary Education',
      'learningResourceType': 'Practice Problem',
      'teaches': 'WAEC SSCE preparation',
      'provider': { '@type': 'Organization', 'name': 'ExamBuddy Nigeria', 'url': BASE },
      'isAccessibleForFree': true,
      'inLanguage': 'en-NG'
    });
  }

})();