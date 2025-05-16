import '../scss/app.scss';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const red = document.querySelector('.red');

gsap.set('.red', { perspective: 500 });

//const words = gsap.utils.toArray('.about'); // Get all elements with class "word"

const aboutText = document.querySelector('.about');

const split = new SplitText(aboutText, {
	type: 'lines, words, chars',
	wordsClass: 'word++',
});

gsap.set(split.chars, { yPercent: -200 });
gsap.set('.purple', { perspective: 500 });

const aboutTl = gsap.timeline({
	scrollTrigger: {
		trigger: '.purple', // The element to trigger the animation
		start: 'top top',
		end: '+=200%',
		pin: true, // Optionally, pin the trigger element
		scrub: true, // Smoothly run the animation as you scroll
		markers: true, // Show markers to visualize triggers (optional)
	},
});

aboutTl.from(split.chars, {
	yPercent: 'random([-300, 300])',
	rotation: 'random(-80, 80)',
	scale: 8,
	autoAlpha: 0,
	ease: 'back.out',
	yoyo: true,
	stagger: {
		amount: 1,
		from: 'random',
	},
});

const tl = gsap.timeline({
	scrollTrigger: {
		trigger: '.box',
		start: '-140% center',
		end: 'bottom center',
		scrub: true,
		markers: true,
		onEnter: () => {
			console.log(`offsetTop: ${red.offsetTop}`);
		},
		onLeave: () => {},
		// onLeave: () => {
		// 	pin.kill();
		// },
	},
});

tl.to('.box', {
	yPercent: 120,
	opacity: 0.9,
	rotationY: 240,
	duration: 8,
	ease: 'power3.in',
})
	.to('.box', {
		//rotationY: 45,
		scale: 1.5,
		x: 50,
		y: 0,
		z: -200,
		opacity: 1,
		ease: 'power2.out',
		delay: 2,
		duration: 8,
	})
	.to('.box', {
		yPercent: 140,
		x: 300,
		y: 300,
		z: -400,
		rotationX: 100,
		duration: 8,
		delay: 0.5,
		ease: 'power2.in',
	})
	.to('.box', {
		x: 300,
		y: 100,
		duration: 8,
		rotateY: -45,
		ease: 'power2.out',
	});

//.box{ transform: translate3d(10px, 0px, -200px) rotateY(45deg) scale(1.5, 1.5)};
