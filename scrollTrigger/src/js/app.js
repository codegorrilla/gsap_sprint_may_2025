import '../scss/app.scss';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

gsap.set('.fuchsia', { perspective: 400 });

//initialize ScrollTrigger
let tl = gsap.timeline({
	scrollTrigger: {
		trigger: '.container',
		pin: true,
		start: 'top top',
		end: '+=500',
		scrub: 3,
		snap: {
			snapTo: 'labels',
			duration: { min: 0.2, max: 3 },
			delay: 0.2,
			ease: 'power1.inOut',
		},
		markers: true, //enable markers for debugging
	},
});

//add animations and labels to the timeline
tl.addLabel('start')
	.from('.box p', { scale: 0.3, rotation: 45, autoAlpha: 0 })
	.addLabel('color')
	.from('.box', {
		backgroundColor: '#28a92b',
		onComplete: () => console.log('Color change complete'),
	})
	.addLabel('spin')
	.to('.box', {
		rotationZ: 360,
		rotationX: 270,
		onComplete: () => console.log('Rotation complete'),
	})
	.addLabel('end');

//Standalone ScrollTrigger
ScrollTrigger.create({
	trigger: '#id',
	start: 'top top',
	end: 'bottom 50% +=100px',
	endTrigger: '#otherId',
	onToggle: (self) => console.log('toggled, isActive:', self.isActive),
	onUpdate: (self) =>
		console.log(
			'progress:',
			self.progress.toFixed(3),
			'direction:',
			self.direction,
			'velocity:',
			self.getVelocity()
		),
});

let sections = gsap.utils.toArray('.panel');

let scrollTween = gsap.to(sections, {
	xPercent: -100 * (sections.length - 1),
	ease: 'none',
	scrollTrigger: {
		trigger: '.dark',
		pin: true,
		scrub: 0.1,
		//snap: directionalSnap(1 / (sections.length - 1)),
		end: '+=2000',
	},
});

['orange', 'blue', 'powderblue', 'purple'].forEach((triggerClass, i) => {
	ScrollTrigger.create({
		trigger: '.' + triggerClass,
		containerAnimation: scrollTween,
		start: 'left 30%',
		end: i === 3 ? 'right right' : 'right 30%',
		markers: false,
		onToggle: (self) =>
			gsap.to('.marker-' + (i + 1), {
				duration: 0.25,
				autoAlpha: self.isActive ? 1 : 0,
			}),
	});
});
