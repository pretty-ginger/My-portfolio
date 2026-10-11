import { gsap } from 'gsap';
import { skills } from './data.js';

export function initSkills() {
  const section = document.querySelector('#skills');
  const ledger = document.querySelector('#ledger');

  ledger.innerHTML = skills
    .map(
      (row, i) => `
    <li class="ledger__row">
      <span class="ledger__no mono">${String(i + 1).padStart(2, '0')}</span>
      <h3 class="ledger__area">${row.area}</h3>
      <p class="ledger__skills">${row.skills.join(', ')}</p>
      <ul class="ledger__tools mono">${row.tools.map((t) => `<li>${t}</li>`).join('')}</ul>
    </li>`
    )
    .join('');

  // hidden starting state
  gsap.set('.skills__title .mask > span', { yPercent: 110 });
  gsap.set('.ledger__row', { opacity: 0, y: 30 });

  // reveal once, when the section scrolls into view
  const io = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      gsap
        .timeline({ defaults: { ease: 'power4.out' } })
        .to('.skills__title .mask > span', { yPercent: 0, duration: 1 })
        .to('.ledger__row', { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, '-=0.6');
    },
    { threshold: 0.2 }
  );
  io.observe(section);
}