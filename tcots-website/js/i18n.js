// i18n.js - Language toggle and translation helpers
import { strings } from '../data/i18n.js';

const STORAGE_KEY = 'tcots-lang';
const DEFAULT_LANG = 'en';

// ---------------------------------------------------------------------------
// Get / set current language
// ---------------------------------------------------------------------------
export function getLang() {
  try {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  } catch {
    return DEFAULT_LANG;
  }
}

export function setLang(lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // localStorage unavailable
  }
  document.documentElement.setAttribute('lang', lang === 'zh' ? 'zh-CN' : 'en');
}

// ---------------------------------------------------------------------------
// Translate a UI string key
// ---------------------------------------------------------------------------
export function t(key) {
  const lang = getLang();
  const entry = strings[key];
  if (!entry) return key;
  return entry[lang] || entry.en || key;
}

// ---------------------------------------------------------------------------
// Get a localized field from a data object
// e.g., localize(post, 'title') returns post.title_zh if lang=zh, else post.title
// Falls back to the English field if no translation exists
// ---------------------------------------------------------------------------
export function localize(obj, field) {
  const lang = getLang();
  if (lang === 'zh') {
    const zhField = field + '_zh';
    if (obj[zhField] !== undefined && obj[zhField] !== '') return obj[zhField];
  }
  return obj[field];
}

// ---------------------------------------------------------------------------
// Toggle language between en and zh, then reload page content
// ---------------------------------------------------------------------------
export function toggleLang() {
  const current = getLang();
  const next = current === 'en' ? 'zh' : 'en';
  setLang(next);
  window.location.reload();
}

// ---------------------------------------------------------------------------
// Initialize: set html lang attribute on load
// ---------------------------------------------------------------------------
setLang(getLang());
