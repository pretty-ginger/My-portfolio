export const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const slideSrc = (s) => (typeof s === 'string' ? s : s.src);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000" viewBox="0 0 800 1000"><rect width="800" height="1000" fill="#1b1b1b"/><text x="400" y="500" fill="#777" font-family="monospace" font-size="28" text-anchor="middle">IMAGE COMING SOON</text></svg>`;
export const PLACEHOLDER = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

// If an image fails to load, swap in the placeholder (once, so it can never loop).
export function attachFallback(img) {
  img.addEventListener('error', () => {
    if (img.dataset.failed) return;
    img.dataset.failed = '1';
    img.src = PLACEHOLDER;
  });
  return img;
}

// Use this to change the src of an image that already has attachFallback.
export function setSrc(img, src) {
  delete img.dataset.failed;
  img.src = src;
}

export function createImage(src, alt = '') {
  const img = attachFallback(new Image());
  img.alt = alt;
  img.loading = 'lazy';
  img.decoding = 'async';
  img.src = src;
  return img;
}