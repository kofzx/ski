import CanvasData from './CanvasData.js';

export default class OffCanvas {
	constructor () {
		let { width, height } = CanvasData.create();
		this.width = width;
		this.height = height;

		let offCanvas = document.createElement('canvas');
		offCanvas.id = 'offCanvas';
		offCanvas.width = this.width;
		offCanvas.height = this.height;
		this.ctx = offCanvas.getContext('2d');
		document.body.appendChild(offCanvas);
	}
	static create () {
		if (!OffCanvas.instance) {
			OffCanvas.instance = new OffCanvas();
		}
		return OffCanvas.instance;
	}
}