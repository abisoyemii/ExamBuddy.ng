/* ============================================================
   ExamBuddy — reusable Supabase client
   Loads configuration from environment-style globals or meta tags.
   ============================================================ */
(function () {
  if (typeof window === 'undefined') return;

  function getMeta(name) {
    const selector = `meta[name="${name}"]`;
    const element = document.querySelector(selector);
    return element ? element.content.trim() : null;
  }

  function getEnvValue(key) {
    if (!window) return null;
    const normalizedKey = String(key).trim();
    const fallback = (window.__ENV__ && window.__ENV__[normalizedKey]) ||
                     (window.ENV && window.ENV[normalizedKey]) ||
                     (window[normalizedKey]);
    if (fallback) return String(fallback).trim();

    const metaName = normalizedKey.toLowerCase().replace(/_/g, '-');
    return getMeta(metaName) || getMeta(`env:${metaName}`) || null;
  }

  function requireEnvValue(key) {
    const value = getEnvValue(key);
    if (!value) {
      throw new Error(`Missing required Supabase configuration: ${key}. ` +
        `Set window.${key} or add <meta name=\"${key.toLowerCase().replace(/_/g, '-')}/\" content=...>.`);
    }
    return value;
  }

  function getSupabaseUrl() {
    return requireEnvValue('SUPABASE_URL');
  }

  function getSupabaseAnonKey() {
    return requireEnvValue('SUPABASE_ANON_KEY');
  }

  let client = null;

  function createSupabaseClient() {
    if (!window.supabase || typeof window.supabase.createClient !== 'function') {
      throw new Error('Supabase SDK not loaded. Include the Supabase CDN before supabase-client.js');
    }

    const url = getSupabaseUrl();
    const anonKey = getSupabaseAnonKey();

    client = window.supabase.createClient(url, anonKey, {
      auth: { detectSessionInUrl: false, persistSession: true }
    });

    return client;
  }

  function getSupabaseClient() {
    if (!client) {
      client = createSupabaseClient();
    }
    return client;
  }

  window.ebSupabaseClient = {
    getClient: getSupabaseClient,
    getConfig: function () {
      return {
        url: getEnvValue('SUPABASE_URL'),
        anonKey: getEnvValue('SUPABASE_ANON_KEY')
      };
    },
    getEnvValue: getEnvValue
  };
})();
