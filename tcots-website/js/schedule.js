import { getLang, localize } from './i18n.js';

function parseDate(dateString) {
  return new Date(`${dateString}T00:00:00`);
}

function addDays(dateString, days) {
  const date = parseDate(dateString);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function calendarDate(dateString) {
  return dateString.replaceAll('-', '');
}

function formatDateRange(event) {
  const locale = getLang() === 'zh' ? 'zh-CN' : 'en-US';
  const start = parseDate(event.date);
  const dateOptions = { month: 'long', day: 'numeric', weekday: 'long' };

  if (!event.endDate || event.endDate === event.date) {
    return start.toLocaleDateString(locale, dateOptions);
  }

  const end = parseDate(event.endDate);
  const startText = start.toLocaleDateString(locale, dateOptions);
  const endText = end.toLocaleDateString(locale, dateOptions);
  return `${startText} - ${endText}`;
}

function googleCalendarUrl(event) {
  const endDateExclusive = addDays(event.endDate || event.date, 1);
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: localize(event, 'title'),
    dates: `${calendarDate(event.date)}/${calendarDate(endDateExclusive)}`,
    details: localize(event, 'description') || '',
    location: event.location || '',
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function renderOrientationSchedule(container, events) {
  if (!container) return;

  const googleLabel = getLang() === 'zh' ? '\u6dfb\u52a0\u5230 Google \u65e5\u5386' : 'Add to Google Calendar';

  container.innerHTML = events.map((event) => `
    <article class="schedule-item border-t border-white/25 pt-5 pb-3">
      <p class="text-sm font-bold uppercase text-[#f2c14e] mb-2">${formatDateRange(event)}</p>
      <h3 class="text-xl font-bold text-white leading-snug mb-2">${localize(event, 'title')}</h3>
      <p class="text-sm text-white/70 mb-4">${localize(event, 'description')}</p>
      <a href="${googleCalendarUrl(event)}"
         target="_blank"
         rel="noopener noreferrer"
         class="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-[#f2c14e] focus:outline-none focus:ring-2 focus:ring-[#f2c14e] focus:ring-offset-2 focus:ring-offset-[#143f3a] rounded-sm">
        <svg aria-hidden="true" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
        </svg>
        ${googleLabel}
      </a>
    </article>
  `).join('');
}
