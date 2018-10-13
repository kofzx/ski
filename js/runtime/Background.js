import Sprite from '../base/Sprite.js';

export default class Background extends Sprite  {
	constructor () {
		super();
		this.init();
	}
	init () {
		this.bkc = '#0b7ef5';
	}
	draw () {
		this.ctx.fillStyle = this.bkc;
		this.ctx.fillRect(0, 0, this.width, this.height);
	}
}