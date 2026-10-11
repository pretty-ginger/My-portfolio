import { gsap } from 'gsap';

export function initIntro({ onEnter }) {
  const $ = (s) => document.querySelector(s);
  const intro = $('#intro');
  const panel = $('#panel');
  const wipe = $('#wipe');
  const count = $('#count');
  const status = $('#status');
  const enterLabel = $('#enter');
  const bigLines = gsap.utils.toArray('#introBig .mask > span');
  const splitLines = gsap.utils.toArray('#introSplit .mask > span');
  const counter = { value: 0 };

  // If the cover image is missing, the red gradient behind it shows instead.
 const cover = panel.querySelector('img');
if (cover) {
  const drop = () => cover.remove();
  cover.addEventListener('error', drop);
  if (cover.complete && cover.naturalWidth === 0) drop(); // it may have failed before this ran
}

  const tl = gsap.timeline({
    defaults: { ease: 'power4.inOut' },
    onComplete: () => {
      panel.disabled = false;
      panel.focus({ preventScroll: true });
    },
  });

  tl
    // 1. big staggered lines rise out of their masks
    .from(bigLines, { yPercent: 110, duration: 1, stagger: 0.12 })
    // 2. fake loader counter (0 -> 100) runs alongside
    .to(
      counter,
      {
        value: 100,
        duration: 1.8,
        ease: 'power1.inOut',
        onUpdate: () => {
          count.textContent = Math.round(counter.value);
        },
      },
      0.3
    )
    // 3. big lines lift away
    .to(bigLines, { yPercent: -110, duration: 0.9, stagger: 0.08 }, '+=0.2')
    .to(status, { opacity: 0, duration: 0.4, ease: 'none' }, '<')
    // 4. panel opens between the edges, name and title rise in at the sides
    .from(panel, { width: 0, duration: 1.2, clearProps: 'width' }, '-=0.3')
    .from(splitLines, { yPercent: 110, duration: 0.9, stagger: 0.08 }, '<0.2')
    // 5. ENTER fades in
    .from(enterLabel, { opacity: 0, duration: 0.5, ease: 'none' }, '-=0.3');

  // Enter: red wipe up, swap screens underneath, wipe away
  panel.addEventListener('click', () => {
    panel.disabled = true;
    gsap
      .timeline()
      .to(wipe, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'power4.inOut' })
      .add(() => {
        intro.style.display = 'none';
        document.body.classList.remove('is-locked');
        window.scrollTo(0, 0);
        onEnter();
      })
      .to(wipe, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.9, ease: 'power4.inOut' });
  });
}