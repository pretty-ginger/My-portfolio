import './style.css';
import { gsap } from 'gsap';
import { reduceMotion } from './utils.js';
import { initIntro } from './intro.js';
import { initBoard, revealBoard } from './board.js';
import { initLightbox } from './lightbox.js';
import { initSkills } from './skills.js';

// Respect "reduce motion": run every animation ~instantly.
if (reduceMotion) gsap.globalTimeline.timeScale(50);

initBoard();
initSkills();
initLightbox();
initIntro({ onEnter: revealBoard });