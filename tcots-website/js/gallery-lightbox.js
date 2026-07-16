// gallery-lightbox.js - Fullscreen lightbox for gallery images
// Usage: add class "lightbox-trigger" with data-src and optional data-caption to elements.

let lightboxEl = null;
let images = [];
let currentIndex = 0;

// ---------------------------------------------------------------------------
// Build the lightbox DOM (called once)
// ---------------------------------------------------------------------------
function buildLightbox() {
  if (lightboxEl) return;

  lightboxEl = document.createElement('div');
  lightboxEl.id = 'lightbox-overlay';
  lightboxEl.className = 'lightbox-overlay';
  lightboxEl.setAttribute('role', 'dialog');
  lightboxEl.setAttribute('aria-modal', 'true');
  lightboxEl.setAttribute('aria-label', 'Image lightbox');

  lightboxEl.innerHTML = `
    <!-- Close button -->
    <button id="lightbox-close" class="lightbox-close" aria-label="Close lightbox">&times;</button>

    <!-- Previous -->
    <button id="lightbox-prev" class="lightbox-nav lightbox-prev" aria-label="Previous image">
      <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
    </button>

    <!-- Image wrapper -->
    <div class="lightbox-content">
      <img id="lightbox-img" class="lightbox-img" src="" alt="" />
      <div class="lightbox-info">
        <p id="lightbox-caption" class="lightbox-caption"></p>
        <p id="lightbox-counter" class="lightbox-counter"></p>
      </div>
    </div>

    <!-- Next -->
    <button id="lightbox-next" class="lightbox-nav lightbox-next" aria-label="Next image">
      <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </button>
  `;

  document.body.appendChild(lightboxEl);

  // --- Event listeners ---
  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  document.getElementById('lightbox-prev').addEventListener('click', showPrev);
  document.getElementById('lightbox-next').addEventListener('click', showNext);

  // Close on overlay click (but not on image/content)
  lightboxEl.addEventListener('click', (e) => {
    if (e.target === lightboxEl) closeLightbox();
  });
}

// ---------------------------------------------------------------------------
// Open / close / navigate
// ---------------------------------------------------------------------------
function openLightbox(index) {
  currentIndex = index;
  updateLightboxContent();
  lightboxEl.classList.add('active');
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', handleKeydown);
}

function closeLightbox() {
  lightboxEl.classList.remove('active');
  document.body.style.overflow = '';
  document.removeEventListener('keydown', handleKeydown);
}

function showPrev() {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateLightboxContent();
}

function showNext() {
  currentIndex = (currentIndex + 1) % images.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  const img = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');
  const counter = document.getElementById('lightbox-counter');

  // Fade out then swap
  img.classList.add('lightbox-img--fading');

  // Use a short timeout to allow CSS transition
  setTimeout(() => {
    const item = images[currentIndex];
    img.src = item.src;
    img.alt = item.caption || '';
    caption.textContent = item.caption || '';
    counter.textContent = `${currentIndex + 1} / ${images.length}`;
    img.classList.remove('lightbox-img--fading');
  }, 150);
}

// ---------------------------------------------------------------------------
// Keyboard handling
// ---------------------------------------------------------------------------
function handleKeydown(e) {
  switch (e.key) {
    case 'Escape':
      closeLightbox();
      break;
    case 'ArrowLeft':
      showPrev();
      break;
    case 'ArrowRight':
      showNext();
      break;
  }
}

// ---------------------------------------------------------------------------
// initLightbox - Public initialiser. Call after DOM is ready.
// ---------------------------------------------------------------------------
export function initLightbox() {
  const triggers = document.querySelectorAll('.lightbox-trigger');
  if (triggers.length === 0) return;

  // Collect image data
  images = Array.from(triggers).map((el) => ({
    src: el.getAttribute('data-src') || el.src || el.href || '',
    caption: el.getAttribute('data-caption') || '',
  }));

  buildLightbox();

  triggers.forEach((el, idx) => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(idx);
    });
  });
}
