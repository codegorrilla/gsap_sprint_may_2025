import '../scss/app.scss';
import { gsap } from 'gsap';
import { Draggable, InertiaPlugin } from 'gsap/all';

gsap.registerPlugin(Draggable, InertiaPlugin);

//inertia
gsap.to('.circle', {
	inertia: {
		x: 200,
		y: -300,
	},
});

// gsap.to('.circle', {
// 	inertia: {
// 		x: {
// 			velocity: 500,
// 			max: 1024,
// 			min: 0,
// 		},
// 		y: {
// 			velocity: -300,
// 			max: 720,
// 			min: 0,
// 		},
// 	},
// });

//draggable
const pink = document.querySelector('.pink');
Draggable.create('.circle', { type: 'x' });
Draggable.create('.green', {
	type: 'x,y',
	bounds: pink,
	inertia: true,
});

// Draggable.create('.black', {
// 	type: 'rotation',
// 	bounds: {
// 		minRotation: -360,
// 		maxRotation: 360,
// 	},
// 	inertia: true,
// });

const droppables = document.querySelectorAll('.boxy');
const overlapThresHold = '50%';
const onDrop = (dragged, dropped) => {
	gsap.fromTo(
		dropped,
		{ opacity: 1 },
		{ duration: 0.1, opacity: 0, repeat: 3, yoyo: true }
	);

	Draggable.create(droppables, {
		bounds: 'section.black',
		onDrag: function (e) {
			let i = droppables.length;
			while (--i > -1) {
				if (this.hitTest(droppables[i], overlapThresHold)) {
					droppables[i].classList.add('overlap');
				} else {
					droppables[i].classList.remove('overlap');
				}

				//Alternate test with mouse movement
				// if (
				// 	Draggable.hitTest(droppables[i], e) &&
				// 	droppables[i] !== this.target
				// ) {
				// 	droppables[i].classList.add('overlap');
				// } else {
				// 	droppables[i].classList.remove('overlap');
				// }
			}
		},

		onDragEnd: function (e) {
			let i = droppables.length;
			while (--i > -1) {
				// if (this.hitTest(droppables[i], overlapThresHold)) {
				// 	gsap.to(droppables[i], { duration: 0.5, scale: 1.2 });
				// 	gsap.to(this.target, { duration: 0.5, scale: 0 });
				// 	gsap.to(droppables[i], { duration: 0.5, scale: 1 });
				// 	gsap.to(this.target, { duration: 0.5, scale: 1 });
				// }

				if (this.hitTest(droppables[i], overlapThreshold)) {
					onDrop(this.target, droppables[i]);
				}
			}
		},
	});
};

onDrop('.boxy');
