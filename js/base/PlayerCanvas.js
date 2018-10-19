import CanvasData from './CanvasData.js';

export default class PlayerCanvas {
	constructor () {
		let { width, height } = CanvasData.create();
		this.width = width;
		this.height = height;

		let playerCanvas = document.createElement('canvas');
		playerCanvas.id = 'playerCanvas';
		playerCanvas.width = this.width;
		playerCanvas.height = this.height;
		this.ctx = playerCanvas.getContext('2d');
		document.body.appendChild(playerCanvas);
	}
	static create () {
		if (!PlayerCanvas.instance) {
			PlayerCanvas.instance = new PlayerCanvas();
		}
		return PlayerCanvas.instance;
	}
}