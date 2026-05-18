/* ============================================================
   ExamBuddy — Supabase API service layer
   Routes all backend requests through Supabase functions and tables.
   ============================================================ */
(function () {
  if (typeof window === 'undefined') return;

  function getClient() {
    if (!window.ebSupabaseClient || typeof window.ebSupabaseClient.getClient !== 'function') {
      throw new Error('Supabase client is not initialized. Load supabase-client.js first.');
    }
    return window.ebSupabaseClient.getClient();
  }

  function normalizeError(error) {
    if (!error) return new Error('Unknown Supabase error');
    if (typeof error === 'string') return new Error(error);
    if (error.message) return new Error(error.message);
    return new Error(JSON.stringify(error));
  }

  function _saveLocalHistory(examName, resultObj) {
    try {
      const history = JSON.parse(localStorage.getItem('exambuddy_history') || '[]');
      history.push({ exam: examName, date: new Date().toISOString(), ...resultObj });
      if (history.length > 200) history.splice(0, history.length - 200);
      localStorage.setItem('exambuddy_history', JSON.stringify(history));
    } catch (e) { console.warn('[ExamBuddy] local history save failed', e); }
  }

  function _getLocalHistory(examFilter) {
    try {
      let history = JSON.parse(localStorage.getItem('exambuddy_history') || '[]');
      if (examFilter && examFilter !== 'all') {
        history = history.filter(function (item) {
          return item.exam.toLowerCase() === examFilter.toLowerCase();
        });
      }
      return history.reverse();
    } catch (e) {
      return [];
    }
  }

  function _saveLocalProgress(examName, progress) {
    try {
      const key = 'exambuddy_progress_' + examName.toLowerCase();
      localStorage.setItem(key, JSON.stringify(progress));
    } catch (e) { console.warn('[ExamBuddy] local progress save failed', e); }
  }

  function _getLocalProgress(examName) {
    try {
      const key = 'exambuddy_progress_' + examName.toLowerCase();
      return JSON.parse(localStorage.getItem(key) || 'null');
    } catch (e) {
      return null;
    }
  }

  async function invokeFunction(functionName, payload) {
    const client = getClient();
    const response = await client.functions.invoke(functionName, {
      body: JSON.stringify(payload || {})
    });

    if (response.error) {
      throw normalizeError(response.error);
    }

    if (response.data && typeof response.data === 'object') {
      return response.data;
    }

    return response.text();
  }

  async function ebFetchQuestions(options) {
    if (!options || typeof options !== 'object') {
      throw new Error('ebFetchQuestions requires an options object');
    }
    if (!options.exam || !Array.isArray(options.subjects)) {
      throw new Error('ebFetchQuestions requires { exam, subjects }');
    }

    const payload = {
      exam: options.exam,
      subjects: options.subjects,
      count: options.count || 40,
      year: options.year || undefined,
      category: options.category || undefined
    };

    const data = await invokeFunction('get-questions', payload);
    if (data.error) throw new Error(data.error);
    return Array.isArray(data.questions) ? data.questions : [];
  }

  async function ebFetchSubjects(exam) {
    if (!exam) {
      throw new Error('ebFetchSubjects requires an exam type');
    }
    const data = await invokeFunction('get-subjects', { exam });
    if (data.error) throw new Error(data.error);
    return Array.isArray(data.subjects) ? data.subjects : [];
  }

  async function ebSaveResult(examName, resultObj) {
    const user = window.ebGetUser ? await window.ebGetUser() : null;
    if (!user) { _saveLocalHistory(examName, resultObj); return; }

    const client = getClient();
    const { error } = await client.from('exam_results').insert({
      user_id: user.id,
      exam: examName,
      score_pct: resultObj.pct,
      correct: resultObj.correct,
      wrong: resultObj.wrong,
      skipped: resultObj.skipped,
      total_qs: resultObj.total,
      time_taken: resultObj.timeTaken,
      subjects: resultObj.subjects || null,
      taken_at: new Date().toISOString()
    });

    if (error) {
      console.warn('[ExamBuddy] failed to save exam result, storing locally', error);
      _saveLocalHistory(examName, resultObj);
      return;
    }

    _saveLocalHistory(examName, resultObj);
  }

  async function ebGetResults(examFilter) {
    const user = window.ebGetUser ? await window.ebGetUser() : null;
    if (!user) return _getLocalHistory(examFilter);

    const client = getClient();
    let query = client.from('exam_results').select('*').eq('user_id', user.id).order('taken_at', { ascending: false }).limit(200);
    if (examFilter && examFilter !== 'all') {
      query = query.ilike('exam', examFilter);
    }

    const { data, error } = await query;
    if (error || !data) {
      console.warn('[ExamBuddy] fetch results failed, falling back to local history', error);
      return _getLocalHistory(examFilter);
    }

    return data.map(function (record) {
      return {
        exam: record.exam,
        date: record.taken_at,
        pct: record.score_pct,
        correct: record.correct,
        wrong: record.wrong,
        skipped: record.skipped,
        total: record.total_qs,
        timeTaken: record.time_taken,
        subjects: record.subjects
      };
    });
  }

  async function ebSaveProgress(examName, progress, metadata) {
    const user = window.ebGetUser ? await window.ebGetUser() : null;
    if (!user) {
      _saveLocalProgress(examName, progress || {});
      return;
    }

    const client = getClient();
    if (progress == null) {
      const { error } = await client.from('user_progress').delete().eq('user_id', user.id).eq('exam', examName);
      if (error) {
        console.warn('[ExamBuddy] failed to clear progress', error);
      }
      return;
    }

    const payload = { user_id: user.id, exam: examName, progress: progress || {}, metadata: metadata || null };
    const { error } = await client.from('user_progress').upsert(payload, { onConflict: ['user_id', 'exam'] });
    if (error) {
      console.warn('[ExamBuddy] failed to save progress, storing locally', error);
      _saveLocalProgress(examName, progress);
    }
  }

  async function ebGetProgress(examName) {
    const user = window.ebGetUser ? await window.ebGetUser() : null;
    if (!user) return _getLocalProgress(examName);

    const client = getClient();
    const { data, error } = await client.from('user_progress').select('progress').eq('user_id', user.id).eq('exam', examName).single();
    if (error || !data) {
      return _getLocalProgress(examName);
    }
    return data.progress || null;
  }

  window.ebApi = {
    invokeFunction,
    fetchQuestions: ebFetchQuestions,
    fetchSubjects: ebFetchSubjects,
    saveResult: ebSaveResult,
    getResults: ebGetResults,
    saveProgress: ebSaveProgress,
    getProgress: ebGetProgress,
    _saveLocalHistory,
    _getLocalHistory,
    _saveLocalProgress,
    _getLocalProgress
  };

  window.ebFetchQuestions = ebFetchQuestions;
  window.ebFetchSubjects = ebFetchSubjects;
  window.ebSaveResult = ebSaveResult;
  window.ebGetResults = ebGetResults;
  window.ebSaveProgress = ebSaveProgress;
  window.ebGetProgress = ebGetProgress;
})();
