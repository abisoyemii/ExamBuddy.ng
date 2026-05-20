/* ============================================================
   ExamBuddy Nigeria — supabase.js
   ============================================================ */

const SUPABASE_URL  = 'https://dhcxzdfvpsccmescmavd.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoY3h6ZGZ2cHNjY21lc2NtYXZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4Mjg3NDUsImV4cCI6MjA4ODQwNDc0NX0.4V-z-bgfxXg_AHq7a_K4XOCjtvucTfkK9g7OWkC8LqY';

let _sb = null;

/* ── Init ── */
document.addEventListener('DOMContentLoaded', function () {
  if (!window.supabase) {
    console.error('[ExamBuddy] Supabase SDK not loaded. Add the CDN script before supabase.js');
    return;
  }

  _sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON);

  /* Check existing session on page load */
  _sb.auth.getSession().then(function ({ data }) {
    _applyAuthUI(data.session?.user ?? null);
  });

  /* React to login / logout events */
  _sb.auth.onAuthStateChange(function (_event, session) {
    _applyAuthUI(session?.user ?? null);
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
    /* shared-layout.js not ready yet — retry once after 100ms */
    setTimeout(function () {
      if (typeof window.ebUpdateAuthUI === 'function') {
        window.ebUpdateAuthUI(user);
      }
    }, 100);
  }
}

/* ════════════════════════════════════════════
   AUTH HELPERS
════════════════════════════════════════════ */

async function ebSignUp(name, email, password) {
  if (!_sb) throw new Error('Supabase not initialised');
  const { data, error } = await _sb.auth.signUp({
    email,
    password,
    options: { data: { full_name: name } }
  });
  if (error) throw error;
  return data;
}

async function ebSignIn(email, password) {
  if (!_sb) throw new Error('Supabase not initialised');
  const { data, error } = await _sb.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

async function ebSignOut() {
  if (_sb) await _sb.auth.signOut();
  window.location.href = '/';
}

async function ebGetUser() {
  if (!_sb) return null;
  const { data } = await _sb.auth.getSession();
  return data?.session?.user ?? null;
}

/* ════════════════════════════════════════════
   EXAM RESULTS — save & fetch
════════════════════════════════════════════ */

async function ebSaveResult(examName, resultObj) {
  const user = await ebGetUser();
  if (!user) { _saveLocalHistory(examName, resultObj); return; }

  const { error } = await _sb.from('exam_results').insert({
    user_id   : user.id,
    exam      : examName,
    score_pct : resultObj.pct,
    correct   : resultObj.correct,
    wrong     : resultObj.wrong,
    skipped   : resultObj.skipped,
    total_qs  : resultObj.total,
    time_taken: resultObj.timeTaken,
    subjects  : resultObj.subjects,
    taken_at  : new Date().toISOString(),
  });

  if (error) console.warn('[ExamBuddy] Supabase save failed, using localStorage fallback', error);
  _saveLocalHistory(examName, resultObj);
}

async function ebGetResults(examFilter) {
  const user = await ebGetUser();
  if (!user) return _getLocalHistory(examFilter);

  let query = _sb
    .from('exam_results')
    .select('*')
    .eq('user_id', user.id)
    .order('taken_at', { ascending: false })
    .limit(200);

  if (examFilter && examFilter !== 'all') {
    query = query.ilike('exam', examFilter);
  }

  const { data, error } = await query;
  if (error || !data) return _getLocalHistory(examFilter);

  return data.map(function (r) {
    return {
      exam     : r.exam,
      date     : r.taken_at,
      pct      : r.score_pct,
      correct  : r.correct,
      wrong    : r.wrong,
      skipped  : r.skipped,
      total    : r.total_qs,
      timeTaken: r.time_taken,
      subjects : r.subjects,
    };
  });
}

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

/* ════════════════════════════════════════════
   EDGE FUNCTIONS — Dynamic Questions
════════════════════════════════════════════ */

async function ebGetSubjects(exam) {
  if (!_sb) throw new Error('Supabase not initialised');
  const { data, error } = await _sb.functions.invoke('get-subjects', {
    body: { exam }
  });
  if (error) throw error;
  return data.subjects || [];
}

async function ebGetQuestions(exam, subjects, count = 50, year = null, category = null) {
  if (!_sb) throw new Error('Supabase not initialised');
  const { data, error } = await _sb.functions.invoke('get-questions', {
    body: { exam, subjects, count, year, category }
  });
  if (error) throw error;
  return data.questions || [];
}
