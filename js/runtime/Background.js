import Sprite from '../base/Sprite.js';

export default class Background extends Sprite  {
	constructor () {
		super();
		this.init();
	}
	init () {
		this.bkg = new Image();
		this.bkg.src = '../../res/bg.jpg';
	}
	draw () {
		this.ctx.drawImage(this.bkg, 0, 0, this.width, this.height);
	}
}