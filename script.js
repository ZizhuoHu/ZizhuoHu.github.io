const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');
const dropTrigger = document.querySelector('.drop-trigger');
const dropdown = document.querySelector('.dropdown');

if (mobileToggle && navLinks) {
  mobileToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
}

if (dropTrigger && dropdown) {
  dropTrigger.addEventListener('click', (event) => {
    event.preventDefault();
    dropdown.classList.toggle('open');
  });
}

document.addEventListener('click', (event) => {
  if (dropdown && !dropdown.contains(event.target)) dropdown.classList.remove('open');
});

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox?.querySelector('img');
const lightboxCaption = lightbox?.querySelector('p');
const lightboxClose = lightbox?.querySelector('.lightbox-close');
let lastGalleryTrigger = null;

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('lightbox-active');
  if (lightboxImage) lightboxImage.src = '';
  lastGalleryTrigger?.focus();
}

document.querySelectorAll('[data-lightbox-src]').forEach((item) => {
  item.addEventListener('click', () => {
    if (!lightbox || !lightboxImage) return;
    lastGalleryTrigger = item;
    lightboxImage.src = item.dataset.lightboxSrc;
    lightboxImage.alt = item.dataset.lightboxAlt || '';
    if (lightboxCaption) lightboxCaption.textContent = item.querySelector('span')?.textContent || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-active');
    lightboxClose?.focus();
  });
});

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox?.classList.contains('open')) closeLightbox();
});


// YouTube embeds require a normal http/https page origin. When the portfolio is
// opened directly from a ZIP or local folder (file://), keep a clean thumbnail
// link instead of loading an iframe that would display YouTube Error 153.
document.querySelectorAll('.youtube-embed').forEach((container) => {
  const isWebPage = window.location.protocol === 'http:' || window.location.protocol === 'https:';
  if (!isWebPage) return;

  const videoId = container.dataset.youtubeId;
  const title = container.dataset.videoTitle || 'YouTube video';
  if (!videoId) return;

  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?rel=0`;
  iframe.title = title;
  iframe.loading = 'lazy';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  iframe.allowFullscreen = true;
  container.replaceChildren(iframe);
});
