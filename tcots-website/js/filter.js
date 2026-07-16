// filter.js - Generic filtering functionality
// Usage: initFilter(containerSelector, itemSelector, filterBtnSelector)
// Filter buttons need a data-filter attribute ("all" or a category value).
// Filterable items need a data-category attribute.

/**
 * Initialise category filtering.
 *
 * @param {string} containerSelector - Selector for the container holding filterable items.
 * @param {string} itemSelector      - Selector for each filterable item inside the container.
 * @param {string} filterBtnSelector - Selector for the filter buttons.
 */
export function initFilter(containerSelector, itemSelector, filterBtnSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const buttons = document.querySelectorAll(filterBtnSelector);
  if (buttons.length === 0) return;

  // Apply initial styles to items so transitions work
  const items = container.querySelectorAll(itemSelector);
  items.forEach((item) => {
    item.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
    item.style.opacity = '1';
    item.style.transform = 'scale(1)';
  });

  // Button click handler
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filterValue = btn.getAttribute('data-filter');

      // Update active button state
      buttons.forEach((b) => {
        b.classList.remove('filter-btn-active', 'bg-[#4d9cc4]', 'text-white');
        b.classList.add('bg-gray-200', 'text-gray-700');
      });
      btn.classList.add('filter-btn-active', 'bg-[#4d9cc4]', 'text-white');
      btn.classList.remove('bg-gray-200', 'text-gray-700');

      // Filter items
      const currentItems = container.querySelectorAll(itemSelector);
      currentItems.forEach((item) => {
        const category = item.getAttribute('data-category') || '';
        const shouldShow = filterValue === 'all' || category === filterValue;

        if (shouldShow) {
          // Show
          item.style.display = '';
          // Force reflow before applying visible styles so transition fires
          void item.offsetHeight;
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
          item.style.pointerEvents = '';
        } else {
          // Hide with transition
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          item.style.pointerEvents = 'none';

          // After transition, set display:none
          const onEnd = () => {
            // Only hide if still filtered out (user might have clicked again)
            if (item.style.opacity === '0') {
              item.style.display = 'none';
            }
            item.removeEventListener('transitionend', onEnd);
          };
          item.addEventListener('transitionend', onEnd, { once: true });
        }
      });
    });
  });

  // Set the first button (usually "All") as active by default
  if (buttons.length > 0) {
    const firstBtn = buttons[0];
    firstBtn.classList.add('filter-btn-active', 'bg-[#4d9cc4]', 'text-white');
    firstBtn.classList.remove('bg-gray-200', 'text-gray-700');
  }
}
