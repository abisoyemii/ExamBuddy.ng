/* ============================================================
   ExamBuddy Nigeria — exam-redirect.js
   Portal click tracking + Google Analytics / Facebook Pixel hooks
   ============================================================ */

(function () {

  /* ---- Open portal with tracking ---- */
  window.openPortal = function (url, name) {
    // Track to localStorage
    var key = 'portal_clicks';
    var clicks = {};
    try { clicks = JSON.parse(localStorage.getItem(key)) || {}; } catch (e) {}
    clicks[name] = (clicks[name] || 0) + 1;
    try { localStorage.setItem(key, JSON.stringify(clicks)); } catch (e) {}

    // Google Analytics 4 event (uncomment when GA is set up)
    // if (typeof gtag !== 'undefined') {
    //   gtag('event', 'portal_click', { portal_name: name, portal_url: url });
    // }

    // Facebook Pixel (uncomment when Pixel is set up)
    // if (typeof fbq !== 'undefined') {
    //   fbq('trackCustom', 'PortalClick', { portal: name });
    // }

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  /* ---- Attach to [data-portal] elements ---- */
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-portal]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        var name = el.getAttribute('data-portal');
        var url  = el.getAttribute('href') || el.getAttribute('data-url');
        if (url) {
          e.preventDefault();
          openPortal(url, name);
        }
      });
    });
  });

})();