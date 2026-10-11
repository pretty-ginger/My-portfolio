import { gsap } from 'gsap';
import { attachFallback, setSrc, slideSrc } from './utils.js';

const $ = (s) => document.querySelector(s);
const lb = $('#lb');
const stage = $('#lbStage');
const img = attachFallback($('#lbImg'));
const prev = $('#lbPrev');
const next = $('#lbNext');
const closeBtn = $('#lbClose');
const main = $('#main');
const info = $('#lbInfo');
const handle = $('#lbHandle');

let work = null;
let index = 0;
let opener = null;

function setSheet(open) {
  info.classList.toggle('is-open', open);
  handle.setAttribute('aria-expanded', String(open));
  info.scrollTop = 0;
}

function show(i, dir = 0) {
  const total = work.slides.length;
  index = i;

  const slide = work.slides[i];
  const s = typeof slide === 'string' ? {} : slide;

  // each slide's own text, falling back to the work's text
  const info = {
    title: s.title ?? work.title,
    description: s.description ?? work.description,
    role: s.role ?? work.role,
    tools: s.tools ?? work.tools,
    year: s.year ?? work.year,
  };

  setSrc(img, slideSrc(slide));
  img.alt = `${info.title}, page ${i + 1} of ${total}`;

  $('#lbTag').textContent = `${work.tag}, ${info.year}`;
  $('#lbTitle').textContent = info.title;
  $('#lbDesc').textContent = info.description;
  $('#lbRole').textContent = info.role;
  $('#lbTools').textContent = info.tools;

  $('#lbCount').textContent =
    total > 1 ? `${String(i + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}` : '';

  // arrows only exist for multi-page work; right arrow leads, left appears after page 1
  prev.hidden = total < 2 || i === 0;
  next.hidden = total < 2 || i === total - 1;

  // don't strand keyboard focus on a button that just disappeared
  if (document.activeElement === next && next.hidden) (prev.hidden ? closeBtn : prev).focus();
  if (document.activeElement === prev && prev.hidden) (next.hidden ? closeBtn : next).focus();

  if (dir) {
    gsap.fromTo(img, { x: 60 * dir, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, ease: 'power3.out' });
    // the text slides in with the image
    gsap.fromTo(
      '.lb__info > :not(.lb__count):not(.lb__link)',
      { y: 14, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power3.out' }
    );
  }
  if (work.slides[i + 1]) new Image().src = slideSrc(work.slides[i + 1]); // preload next page
}

function go(dir) {
  if (!work) return;
  const n = index + dir;
  if (n < 0 || n >= work.slides.length) return;
  show(n, dir);
}

export function openLightbox(w, trigger) {
  work = w;
  opener = trigger;

 

  const link = $('#lbLink');
  link.hidden = !w.link;
  if (w.link) link.href = w.link;

  lb.hidden = false;
  document.body.classList.add('is-locked');
  main.inert = true;
  setSheet(false);
  show(0);

  gsap.fromTo(lb, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'none' });
  closeBtn.focus();
}

export function closeLightbox() {
  gsap.to(lb, {
    opacity: 0,
    duration: 0.25,
    ease: 'none',
    onComplete: () => {
      lb.hidden = true;
      document.body.classList.remove('is-locked');
      main.inert = false;
      opener?.focus({ preventScroll: true });
      work = null;
    },
  });
}

export function initLightbox() {
  prev.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));
  closeBtn.addEventListener('click', closeLightbox);

  // click the dark area around the image to close
    // click handling: collapse the panel first, otherwise close on the dark area
  lb.addEventListener('click', (e) => {
    if (e.target.closest('.lb__nav')) return;
    if (info.classList.contains('is-open') && e.target.closest('.lb__stage')) {
      setSheet(false);
      return;
    }
    if (e.target === lb || e.target === stage) closeLightbox();
  });

  // grip button toggles the panel
  handle.addEventListener('click', () => setSheet(!info.classList.contains('is-open')));

  // swipe the panel up to open, down to close (down only counts from the top of its text)
  let sheetY = 0;
  let sheetTop = 0;
  info.addEventListener('touchstart', (e) => {
    sheetY = e.changedTouches[0].clientY;
    sheetTop = info.scrollTop;
  }, { passive: true });
  info.addEventListener('touchend', (e) => {
    const dy = e.changedTouches[0].clientY - sheetY;
    const open = info.classList.contains('is-open');
    if (!open && dy < -40) setSheet(true);
    else if (open && dy > 60 && sheetTop === 0) setSheet(false);
  });

  document.addEventListener('keydown', (e) => {
    if (lb.hidden || !work) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  });

  // swipe on touch screens
  let startX = 0;
  stage.addEventListener('touchstart', (e) => (startX = e.changedTouches[0].clientX), { passive: true });
  stage.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
  });
}