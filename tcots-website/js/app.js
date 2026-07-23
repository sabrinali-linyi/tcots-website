// app.js - Shared layout, navigation, footer, and utility functions
import { siteData } from '../data/site.js';
import { t, getLang, toggleLang, localize } from './i18n.js';

// ---------------------------------------------------------------------------
// Navigation items (labels use i18n keys)
// ---------------------------------------------------------------------------
const navItems = [
  { labelKey: 'nav.home', href: 'index.html' },
  { labelKey: 'nav.about', href: 'about.html' },
  { labelKey: 'nav.sundayService', href: 'sunday-service.html' },
  { labelKey: 'nav.events', href: 'events.html' },
  { labelKey: 'nav.gallery', href: 'gallery.html' },
  { labelKey: 'nav.videos', href: 'videos.html' },
  { labelKey: 'nav.resources', href: 'resources.html' },
  { labelKey: 'nav.contact', href: 'contact.html' },
  { labelKey: 'nav.uwStudents', href: siteData.studentGroup.url, external: true },
];

// ---------------------------------------------------------------------------
// Detect the current page from the URL so we can highlight the active link
// ---------------------------------------------------------------------------
function getCurrentPage() {
  const path = window.location.pathname;
  const file = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  return file;
}

// ---------------------------------------------------------------------------
// renderNav - Responsive navigation bar injected into #nav-container
// ---------------------------------------------------------------------------
export function renderNav() {
  const container = document.getElementById('nav-container');
  if (!container) return;

  const currentPage = getCurrentPage();
  const lang = getLang();

  const navLinksHTML = navItems
    .map((item) => {
      const isActive = !item.external && currentPage === item.href;
      return `
        <a href="${item.href}"
           class="nav-link block lg:inline-block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                  ${isActive
                    ? 'bg-white/15 text-blue-200'
                    : 'text-gray-200 hover:bg-white/10 hover:text-white'
                  }"
           ${isActive ? 'aria-current="page"' : ''}
           ${item.external ? 'target="_blank" rel="noopener noreferrer"' : ''}>
          ${t(item.labelKey)}${item.external ? ' <span aria-hidden="true">&#8599;</span>' : ''}
        </a>`;
    })
    .join('');

  const langBtnLabel = lang === 'en' ? '\u4e2d\u6587' : 'EN';
  const langBtnTitle = lang === 'en' ? 'Switch to Chinese' : 'Switch to English';

  container.innerHTML = `
    <nav id="main-nav" class="fixed top-0 left-0 right-0 z-50 bg-[#4d9cc4] shadow-lg">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">

          <!-- Logo / Site Name -->
          <a href="index.html" class="flex items-center space-x-2 flex-shrink-0">
            <img src="images/logo.png" alt="${siteData.name}" class="h-10 w-auto rounded">
            <span class="text-white font-semibold text-sm leading-tight hidden sm:block">${siteData.name}</span>
          </a>

          <!-- Desktop links -->
          <div class="hidden lg:flex lg:items-center lg:space-x-1">
            ${navLinksHTML}
            <button id="lang-toggle-desktop" title="${langBtnTitle}"
                    class="ml-2 px-3 py-1.5 rounded-full text-xs font-bold bg-white/20 text-white border border-white/30 hover:bg-white/30 transition-colors cursor-pointer whitespace-nowrap">
              ${langBtnLabel}
            </button>
          </div>

          <!-- Hamburger button (mobile) -->
          <div class="flex items-center space-x-2 lg:hidden">
            <button id="lang-toggle-mobile" title="${langBtnTitle}"
                    class="px-2.5 py-1 rounded-full text-xs font-bold bg-white/20 text-white border border-white/30 hover:bg-white/30 transition-colors cursor-pointer">
              ${langBtnLabel}
            </button>
            <button id="mobile-menu-btn" type="button"
                    class="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 transition-colors"
                    aria-expanded="false" aria-label="Toggle navigation menu">
              <span class="hamburger-icon">
                <span class="hamburger-bar block w-6 h-0.5 bg-current transition-transform duration-300 origin-center"></span>
                <span class="hamburger-bar block w-6 h-0.5 bg-current mt-1.5 transition-opacity duration-300"></span>
                <span class="hamburger-bar block w-6 h-0.5 bg-current mt-1.5 transition-transform duration-300 origin-center"></span>
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile menu -->
      <div id="mobile-menu" class="mobile-menu lg:hidden overflow-hidden max-h-0 transition-[max-height] duration-500 ease-in-out bg-[#4d9cc4]/95 backdrop-blur">
        <div class="px-4 pt-2 pb-4 space-y-1">
          ${navLinksHTML}
        </div>
      </div>
    </nav>
  `;

  // Language toggle click handlers
  document.getElementById('lang-toggle-desktop')?.addEventListener('click', toggleLang);
  document.getElementById('lang-toggle-mobile')?.addEventListener('click', toggleLang);

  // Hamburger toggle logic
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');

  if (btn && menu) {
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isOpen));
      btn.classList.toggle('menu-open', !isOpen);

      if (!isOpen) {
        menu.style.maxHeight = menu.scrollHeight + 'px';
      } else {
        menu.style.maxHeight = '0';
      }
    });
  }
}

// ---------------------------------------------------------------------------
// renderFooter - Footer injected into #footer-container
// ---------------------------------------------------------------------------
export function renderFooter() {
  const container = document.getElementById('footer-container');
  if (!container) return;

  const currentYear = new Date().getFullYear();
  const startYear = siteData.copyright.startYear;
  const yearDisplay = startYear < currentYear ? `${startYear}\u2013${currentYear}` : `${currentYear}`;

  const quickLinks = navItems
    .filter((item, i) => i < 5 || item.external)
    .map((item) => `<a href="${item.href}" ${item.external ? 'target="_blank" rel="noopener noreferrer"' : ''} class="text-gray-400 hover:text-[#7ec3de] transition-colors text-sm">${t(item.labelKey)}${item.external ? ' &#8599;' : ''}</a>`)
    .join('');

  container.innerHTML = `
    <footer class="bg-[#4d9cc4] text-gray-300 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-10">

          <!-- Column 1: Site info -->
          <div>
            <div class="flex items-center space-x-2 mb-4">
              <img src="images/logo.png" alt="${siteData.name}" class="h-10 w-auto rounded">
              <span class="text-white font-semibold text-sm leading-tight">${siteData.name}</span>
            </div>
            <p class="text-sm text-gray-400 leading-relaxed">${localize(siteData, 'tagline')}</p>
          </div>

          <!-- Column 2: Quick links -->
          <div>
            <h4 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider">${t('footer.quickLinks')}</h4>
            <div class="flex flex-col space-y-2">
              ${quickLinks}
            </div>
          </div>

          <!-- Column 3: Contact -->
          <div>
            <h4 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider">${t('footer.contact')}</h4>
            <address class="not-italic text-sm text-gray-400 space-y-2">
              <p>${siteData.address}</p>
              <p>
                <a href="mailto:${siteData.email}" class="hover:text-[#7ec3de] transition-colors">${siteData.email}</a>
              </p>
              <p>
                <a href="${siteData.instagram}" target="_blank" rel="noopener noreferrer" class="hover:text-[#7ec3de] transition-colors inline-flex items-center space-x-1">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  <span>${siteData.instagramHandle}</span>
                </a>
              </p>
            </address>
          </div>
        </div>

        <!-- Bottom bar -->
        <div class="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
          &copy; ${yearDisplay} ${siteData.name}. ${t('footer.rights')}
        </div>
      </div>
    </footer>
  `;
}

// ---------------------------------------------------------------------------
// Utility: formatDate - Converts ISO date string to human-readable format
// ---------------------------------------------------------------------------
export function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  const lang = getLang();
  return date.toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// ---------------------------------------------------------------------------
// Utility: createYouTubeEmbed - Returns responsive YouTube iframe HTML
// ---------------------------------------------------------------------------
export function createYouTubeEmbed(youtubeId) {
  if (!youtubeId) return '';
  return `
    <div class="relative w-full overflow-hidden rounded-lg shadow-lg" style="padding-top:56.25%">
      <iframe
        class="absolute inset-0 w-full h-full"
        src="https://www.youtube-nocookie.com/embed/${youtubeId}"
        title="YouTube video"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        loading="lazy">
      </iframe>
    </div>`;
}

// ---------------------------------------------------------------------------
// Utility: truncateText - Truncate text with ellipsis
// ---------------------------------------------------------------------------
export function truncateText(text, maxLength = 120) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '\u2026';
}

// ---------------------------------------------------------------------------
// Re-export i18n helpers so pages can import from app.js
// ---------------------------------------------------------------------------
export { t, getLang, localize, toggleLang };

// ---------------------------------------------------------------------------
// Auto-initialise on DOMContentLoaded
// ---------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  renderNav();
  renderFooter();
});
