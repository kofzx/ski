import CanvasData from '../base/CanvasData.js';

export default class Sprite {
	constructor () {
		let { ctx, width, height } = CanvasData.create();
		this.ctx = ctx;
		this.width = width;
		this.height = height;
	}
}