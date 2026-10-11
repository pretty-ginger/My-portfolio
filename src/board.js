import { gsap } from 'gsap';
import { files } from './data.js';
import { openLightbox } from './lightbox.js';
import { createImage, reduceMotion, slideSrc } from './utils.js';

const $ = (s) => document.querySelector(s);
const stage = $('#stage');
const svg = $('#thread');
const path = svg.querySelector('path');
const list = $('#filesList');
const caseGrid = $('#caseGrid');
const gridEl = $('#grid');
const scrollBehavior = reduceMotion ? 'auto' : 'smooth';

let threadRevealed = false;
let activeId = null;

/* ---------- case file cards ---------- */
function renderCards() {
  list.innerHTML = files
    .map(
      (f) => `
    <li class="file">
      <button class="card" type="button" data-id="${f.id}"
              aria-expanded="false" aria-controls="caseGrid" style="--rot:${f.rot}deg">
        <span class="pin" aria-hidden="true"></span>
        <span class="card__tab mono">${f.label}</span>
        <span class="card__title">${f.title}</span>
        <span class="card__blurb">${f.blurb}</span>
        <span class="card__foot mono"><span>${f.works.length} works</span><span>Open file</span></span>
      </button>
    </li>`
    )
    .join('');

  list.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('click', () => openFile(card.dataset.id));
  });
}

/* ---------- red thread ---------- */
// Position of an element's centre relative to `root`, ignoring transforms
// (so it stays correct while cards are mid-animation).
function centerIn(el, root) {
  let x = el.offsetWidth / 2;
  let y = el.offsetHeight / 2;
  for (let n = el; n && n !== root; n = n.offsetParent) {
    x += n.offsetLeft;
    y += n.offsetTop;
  }
  return { x, y };
}

function drawThread() {
  svg.setAttribute('viewBox', `0 0 ${stage.offsetWidth} ${stage.offsetHeight}`);

  const pts = [...stage.querySelectorAll('.pin')].map((pin) => centerIn(pin, stage));
  if (pts.length < 2) return;

  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const dx = Math.abs(b.x - a.x);
    const dy = Math.abs(b.y - a.y);
    const sag = Math.min(90, Math.hypot(dx, dy) * 0.16);
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2;
    // wide gap: the thread sags downward. stacked layout (mobile): it bows sideways.
    const cx = dx >= dy ? mx : mx + (i % 2 ? sag : -sag);
    const cy = dx >= dy ? my + sag : my;
    d += ` Q ${cx} ${cy} ${b.x} ${b.y}`;
  }
  path.setAttribute('d', d);

  if (threadRevealed) {
    gsap.set(path, { strokeDasharray: 'none', strokeDashoffset: 0 });
  } else {
    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
  }
}

/* ---------- open / close a case file ---------- */
function makeTile(work) {
  const tile = document.createElement('button');
  tile.type = 'button';
  tile.className = 'tile';
  tile.setAttribute('aria-label', `Open ${work.title}`);

  const info = document.createElement('span');
  info.className = 'tile__info';
  info.innerHTML = `<span class="tile__title"></span><span class="tile__meta mono"></span>`;
  info.querySelector('.tile__title').textContent = work.title;
  info.querySelector('.tile__meta').textContent = `${work.tag}, ${work.year}`;

  tile.append(createImage(work.cover ?? slideSrc(work.slides[0])), info);

  if (work.slides.length > 1) {
    const badge = document.createElement('span');
    badge.className = 'tile__badge mono';
    badge.textContent = `${work.slides.length} pages`;
    tile.append(badge);
  }

  tile.addEventListener('click', () => openLightbox(work, tile));
  return tile;
}

function openFile(id) {
  const file = files.find((f) => f.id === id);
  if (!file) return;
  activeId = id;

  list.querySelectorAll('.card').forEach((c) => {
    const on = c.dataset.id === id;
    c.classList.toggle('is-active', on);
    c.setAttribute('aria-expanded', String(on));
  });

  $('#gridLabel').textContent = file.label;
  $('#gridTitle').textContent = file.title;
  gridEl.replaceChildren(...file.works.map(makeTile));
  caseGrid.hidden = false;

  gsap.fromTo(
    '.tile',
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 0.7, stagger: 0.06, ease: 'power3.out' }
  );
  caseGrid.scrollIntoView({ behavior: scrollBehavior, block: 'start' });
}

function closeFile() {
  const id = activeId;
  activeId = null;
  caseGrid.hidden = true;
  list.querySelectorAll('.card').forEach((c) => {
    c.classList.remove('is-active');
    c.setAttribute('aria-expanded', 'false');
  });
  stage.scrollIntoView({ behavior: scrollBehavior, block: 'center' });
  list.querySelector(`[data-id="${id}"]`)?.focus({ preventScroll: true });
}

/* ---------- init + reveal ---------- */
export function initBoard() {
  renderCards();

  // starting (hidden) state for the reveal
  gsap.set('#boardTitle .mask > span', { yPercent: 110 });
  gsap.set('.file', { opacity: 0, y: 60 });
  gsap.set('.pin', { scale: 0 });

  new ResizeObserver(drawThread).observe(stage);
  document.fonts.ready.then(drawThread);
  $('#gridClose').addEventListener('click', closeFile);
}

export function revealBoard() {
  $('#main').inert = false;

  gsap
    .timeline({ delay: 0.35, defaults: { ease: 'power4.out' } })
    .to('#boardTitle .mask > span', { yPercent: 0, duration: 1, stagger: 0.1 })
    .to('.file', { opacity: 1, y: 0, duration: 0.9, stagger: 0.15 }, '-=0.6')
    .to('.pin', { scale: 1, duration: 0.4, ease: 'back.out(3)', stagger: 0.15 }, '<0.2')
    .to(
      path,
      {
        strokeDashoffset: 0,
        duration: 1.6,
        ease: 'power2.inOut',
        onComplete: () => {
          threadRevealed = true;
          drawThread();
        },
      },
      '-=0.2'
    );
}