import * as THREE from 'three';
import * as THREEx from '@ar-js-org/ar.js/three.js/build/ar-threex-location-only.js';

function main() {
	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	
	// PerspectiveCamera:
	// - FOV
	// - Aspect ratio
	// - Near plane
	// - Far plane
	const renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

 	const arjs = new THREEx.LocationBased(scene, camera);
	const cam = new THREEx.WebcamRenderer(renderer);

	const geom = new THREE.BoxGeometry(20, 20, 20);
	const mtl = new THREE.MeshBasicMaterial({color: 0xff0000});
	const box = new THREE.Mesh(geom, mtl);
	arjs.add(box, -0.72, 51.051); 
	arjs.fakeGps(-0.72, 51.05);

	// Render loop
	// Use requestAnimationFrame to recursively call the render loop
	// - Only calls render loop when the user is able to see the window, to avoid wasting resources 
	function render() {
			// if(canvas.width != canvas.clientWidth || canvas.height != canvas.clientHeight) {
			// 		renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
			// 		const aspect = canvas.clientWidth/canvas.clientHeight;
			// 		camera.aspect = aspect;
			// 		camera.updateProjectionMatrix();
			// }
			cam.update();
			renderer.render(scene, camera);
			requestAnimationFrame(render);
	}
	render();
}

main();