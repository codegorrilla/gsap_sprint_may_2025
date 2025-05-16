import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import '../scss/app.scss';

gsap.registerPlugin({ SplitText, ScrollTrigger });

//this is a tween
gsap.to('.box', { rotation: 27, x: 100, duration: 1, ease: 'power2.inOut' });

//Split text
// const animateText = document.fonts.ready.then(() => {
// 	SplitText.create('.title', {
// 		type: 'words,chars,lines',

// 		onSplit(self) {
// 			gsap.from(self.words, {
// 				autoAlpha: 0,
// 				yPercent: 'random([-200, 200])',
// 				rotation: 'random(-30, 30)',
// 				ease: 'back.out',
// 				repeat: 3,
// 				yoyo: true,
// 				stagger: {
// 					amount: 0.5,
// 					from: 'random',
// 				},
// 				onComplete: () => split.revert(),
// 			});
// 		},

// 		wordsClass: 'word++',
// 		//propIndex: true,
// 		//autoSplit: true,
// 		//reduceWhiteSpace: true,
// 		mask: 'words',
// 	});
// });

// document.getElementById('animated').addEventListener('click', () => {
// 	//console.log('clicked');
// 	animateText();
// });

const animateText = SplitText.create('.title', {
	type: 'chars, words, lines',
	mask: 'lines',
	wordsClass: 'word++',
	reduceWhiteSpace: true,
	propIndex: true,
});

gsap.from(animateText.chars, {
	yPercent: 'random([-100, 100])',
	rotation: 'random(-30, 30)',
	autoAlpha: 0,
	ease: 'back.out',
	repeat: 2,
	yoyo: true,
	stagger: {
		amount: 0.5,
		from: 'random',
	},
});

//this is a timeline
let tl = gsap.timeline();

tl.to('#green', { duration: 1, x: 786 }, 0.5)
	.add('blueSpin', '+=1')
	.to('#blue', { duration: 2, x: 786, rotation: 360 }, 'bluespin') //-=0.75 means wait 0.75 seconds after the previous animation => position parameter
	.addLabel('step2', 3)
	.to('#orange', { duration: 1, x: 786 }, 'blueSpin +=.5');

document.getElementById('seek').addEventListener('click', () => {
	tl.seek('step2');
	console.log(`step2 achieved`);
});

document.getElementById('time').addEventListener('click', () => {
	console.log(`duration of the animation is ${tl.time()}s`);
});

//gsap effects property
gsap.registerEffect({
	name: 'fade',
	effect: (targets, config) => {
		return gsap.to(targets, { duration: config.duration, opacity: 0 });
	},
	defaults: { duration: 2 },
	extendTimeline: true,
});

document.getElementById('effect').addEventListener('click', () => {
	gsap.effects.fade('#green', { duration: 3 });
});

document.getElementById('effect').addEventListener('click', () => {
	gsap.effects.fade('#purple', { duration: 3 });
});
