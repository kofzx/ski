import CanvasData from './CanvasData.js';

export default class StoneCanvas {
	constructor () {
		let { width, height } = CanvasData.create();
		this.width = width;
		this.height = height;

		let stoneCanvas = document.createElement('canvas');
		stoneCanvas.id = 'stoneCanvas';
		stoneCanvas.width = this.width;
		stoneCanvas.height = this.height;
		this.ctx = stoneCanvas.getContext('2d');
		document.body.appendChild(stoneCanvas);
	}
	static create () {
		if (!StoneCanvas.instance) {
			StoneCanvas.instance = new StoneCanvas();
		}
		return StoneCanvas.instance;
	}
}