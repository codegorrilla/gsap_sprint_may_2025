import '../scss/example.scss';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/all';

gsap.registerPlugin(Draggable, InertiaPlugin);

const dragCirc = Draggable.create('.circle', {
	type: 'x,y',
	bounds: window,
	inertia: true,
	onDragStart: () => {
		gsap.to('.circle', { scale: 1.2, duration: 0.2, ease: 'back.inOut' });
	},
	onDrag: () => {
		console.log('dragging');
	},
	onDragEnd: () => {
		gsap.to('.circle', {
			scale: 1,
			duration: 0.2,
			ease: 'back.inOut',
		});
	},
});

const boxDrag = Draggable.create('.box', {
	type: 'rotation',
	bounds: {
		minRotation: -90,
		maxRotation: 360,
	},
});

document.addEventListener('DOMContentLoaded', dragCirc, boxDrag);
