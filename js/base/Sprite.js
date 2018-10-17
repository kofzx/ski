import CanvasData from './CanvasData.js';

export default class Sprite {
	constructor () {
		let { canvas, ctx, width, height } = CanvasData.create();
		this.canvas = canvas;
		this.ctx = ctx;
		this.width = width;
		this.height = height;
	}
}