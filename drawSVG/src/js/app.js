import '../scss/app.scss';
import { gsap } from 'gsap';
import { DrawSVGPlugin, TextPlugin, MotionPathPlugin } from 'gsap/all';

gsap.registerPlugin(DrawSVGPlugin, TextPlugin, MotionPathPlugin);

let values = '100%;40% 60%;20 350;50% 50%;true;10%'.split(';'),
	currentIndex = 0;

console.log(values);

//set the initial value
gsap.set('#path, #code', { visibility: 'visible' });

const next = () => {
	//in case the user clicks too fast, clear any delayed calls to this method.
	gsap.killTweensOf(next);

	if (++currentIndex === values.length) {
		currentIndex = 0;
	}

	if (values[currentIndex] === 'true') {
		gsap.set('#current', { text: values[currentIndex] });
	} else {
		gsap.set('#current', { text: `${values[currentIndex]}` });
	}

	gsap.to('#path', {
		drawSVG: values[currentIndex],
		duration: 1,
		ease: 'power1.inOut',
		onComplete: () => {
			console.log(
				(document.getElementById('current').innerHTML = values[currentIndex])
			);
		},
	});
};

document.getElementById('next').addEventListener('click', next);

gsap.set('.yourPath', { drawSVG: '0%', visibility: 'visible' });

const animate2 = () => {
	gsap.killTweensOf(animate2);

	gsap.to('.yourPath', {
		drawSVG: '100%',
		duration: 1,
		ease: 'power1.inOut',
	});
};

document.getElementById('animate2').addEventListener('click', animate2);

//house stroke animation

/* 
There's only one <path> but it has a bunch of individual, disconnected segments ("M" commands)
so we'll use the helper function to split that into a bunch of <path> elements so that the browser
can render the stroke progressively in a correct manner.
*/

let paths = splitPaths('#house');
// to animate all the segments at once...
// gsap.from(paths, { drawSVG: 0, duration: 5 });

// but instead, let's animate each segment one-after-the-other and make sure there's a consistent speed.
let duration = 5,
	distance = 0,
	tl = gsap.timeline();
paths.forEach((segment) => (distance += segment.getTotalLength()));
paths.forEach((segment) => {
	tl.from(segment, {
		drawSVG: 0,
		ease: 'none',
		duration: duration * (segment.getTotalLength() / distance),
	});
});

// helper function that busts apart a single <path> that has multiple segments into a <path> for each segment (indicated by an "M" command);
function splitPaths(paths) {
	let toSplit = gsap.utils.toArray(paths),
		newPaths = [];
	if (toSplit.length > 1) {
		toSplit.forEach((path) => newPaths.push(...splitPaths(path)));
	} else {
		let path = toSplit[0],
			rawPath = MotionPathPlugin.getRawPath(path),
			parent = path.parentNode,
			attributes = [].slice.call(path.attributes);
		newPaths = rawPath.map((segment) => {
			let newPath = document.createElementNS(
					'http://www.w3.org/2000/svg',
					'path'
				),
				i = attributes.length;
			while (i--) {
				newPath.setAttributeNS(
					null,
					attributes[i].nodeName,
					attributes[i].nodeValue
				);
			}
			newPath.setAttributeNS(
				null,
				'd',
				'M' +
					segment[0] +
					',' +
					segment[1] +
					'C' +
					segment.slice(2).join(',') +
					(segment.closed ? 'z' : '')
			);
			parent.insertBefore(newPath, path);
			return newPath;
		});
		parent.removeChild(path);
	}
	return newPaths;
}
