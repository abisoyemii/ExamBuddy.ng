/* ============================================================
   ExamBuddy Nigeria — supabase.js
   Auth bootstrap and UI state for Supabase.
   ============================================================ */

let _sb = null;
let _authReady = false;

function _normalizeUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
    full_name: user.user_metadata?.full_name || null,
    raw: user
  };
}

window.ebAuth = {
  user: null,
  ready: false,
  loading: false,
  error: null,
  subscribers: [],
  subscribe(fn) {
    if (typeof fn !== 'function') return function () {};
    this.subscribers.push(fn);
    if (this.ready) fn(this.user);
    return () => { this.subscribers = this.subscribers.filter(sub => sub !== fn); };
  },
  notify(user) {
    this.subscribers.slice().forEach(function (fn) {
      try { fn(user); } catch (e) { console.error('[ExamBuddy] Auth subscriber failed', e); }
    });
  },
  isAuthenticated() {
    return !!this.user;
  }
};

function _setAuthState(user) {
  const normalized = _normalizeUser(user);
  window.ebAuth.user = normalized;
  window.ebAuth.ready = true;
  window.ebAuth.loading = false;
  window.ebAuth.error = null;
  window.ebAuth.notify(normalized);
  window.dispatchEvent(new CustomEvent('eb:auth-changed', { detail: { user: normalized } }));
  if (!_authReady) {
    _authReady = true;
    window.dispatchEvent(new Event('eb:supabase-ready'));
  }
  _applyAuthUI(user);
}

function _setAuthError(error) {
  window.ebAuth.error = error;
  window.ebAuth.loading = false;
  window.ebAuth.notify(window.ebAuth.user);
  window.dispatchEvent(new CustomEvent('eb:auth-error', { detail: { error } }));
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', function () {
  if (!window.ebSupabaseClient || typeof window.ebSupabaseClient.getClient !== 'function') {
    console.error('[ExamBuddy] Supabase client is not available. Make sure supabase-client.js loads before supabase.js');
    return;
  }

  try {
    _sb = window.ebSupabaseClient.getClient();
  } catch (err) {
    console.error('[ExamBuddy] Failed to create Supabase client', err);
    return;
  }

  window._sb = _sb;
  window._sbReady = true;

  _sb.auth.getSession().then(function ({ data }) {
    _setAuthState(data.session?.user ?? null);
  }).catch(function (err) {
    console.warn('[ExamBuddy] Failed to retrieve existing Supabase session', err);
    _setAuthState(null);
  });

  _sb.auth.onAuthStateChange(function (_event, session) {
    _setAuthState(session?.user ?? null);
  });
});

/* ── Single source of truth for auth UI ──
   Uses window.ebUpdateAuthUI defined in shared-layout.js.
   shared-layout.js already calls ebUpdateAuthUI(null) immediately
   so the Log In button is always visible before Supabase resolves. ── */
function _applyAuthUI(user) {
  if (typeof window.ebUpdateAuthUI === 'function') {
    window.ebUpdateAuthUI(user);
  } else {
    setTimeout(function () {
      if (typeof window.ebUpdateAuthUI === 'function') {
        window.ebUpdateAuthUI(user);
      }
    }, 100);
  }
}

async function _waitForAuthReady() {
  if (window.ebAuth && window.ebAuth.ready) return;
  await new Promise(function (resolve) {
    window.addEventListener('eb:supabase-ready', resolve, { once: true });
    setTimeout(resolve, 5000);
  });
}

async function ebRequireAuth(redirectUrl = '/login/') {
  await _waitForAuthReady();
  const user = await ebGetUser();
  if (!user) {
    window.location.href = redirectUrl;
    return null;
  }
  return user;
}

/* ════════════════════════════════════════════
   AUTH HELPERS
════════════════════════════════════════════ */

async function ebSignUp(name, email, password) {
  if (!_sb) throw new Error('Supabase not initialised');
  window.ebAuth.loading = true;
  const { data, error } = await _sb.auth.signUp({
    email,
    password,
    options: { data: { full_name: name } }
  });
  if (error) {
    _setAuthError(error);
    throw error;
  }
  if (data?.user) _setAuthState(data.user);
  return data;
}

async function ebSignIn(email, password) {
  if (!_sb) throw new Error('Supabase not initialised');
  window.ebAuth.loading = true;
  const { data, error } = await _sb.auth.signInWithPassword({ email, password });
  if (error) {
    _setAuthError(error);
    throw error;
  }
  if (data?.user) _setAuthState(data.user);
  return data;
}

async function ebSignOut() {
  if (_sb) await _sb.auth.signOut();
  _setAuthState(null);
  window.location.href = '/';
}

async function ebGetUser() {
  if (!_sb) return null;
  const { data } = await _sb.auth.getSession();
  return _normalizeUser(data?.session?.user ?? null);
}

window.ebAuth.signUp = ebSignUp;
window.ebAuth.signIn = ebSignIn;
window.ebAuth.signOut = ebSignOut;
window.ebAuth.getUser = ebGetUser;
window.ebAuth.requireAuth = ebRequireAuth;

/* ════════════════════════════════════════════
   EXAM RESULTS — save & fetch
════════════════════════════════════════════ */

// Exam results operations are handled by js/supabase-service.js

/* ════════════════════════════════════════════
   LOCAL STORAGE FALLBACK
════════════════════════════════════════════ */

const LS_HISTORY = 'exambuddy_history';

function _saveLocalHistory(examName, resultObj) {
  try {
    const history = JSON.parse(localStorage.getItem(LS_HISTORY) || '[]');
    history.push({ exam: examName, date: new Date().toISOString(), ...resultObj });
    if (history.length > 200) history.splice(0, history.length - 200);
    localStorage.setItem(LS_HISTORY, JSON.stringify(history));
  } catch(e) {}
}

function _getLocalHistory(examFilter) {
  try {
    let h = JSON.parse(localStorage.getItem(LS_HISTORY) || '[]');
    if (examFilter && examFilter !== 'all') {
      h = h.filter(function (r) {
        return r.exam.toLowerCase() === examFilter.toLowerCase();
      });
    }
    return h.reverse();
  } catch(e) { return []; }
}