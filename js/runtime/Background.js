import Sprite from '../base/Sprite.js';

export default class Background extends Sprite  {
	constructor () {
		super();
		this.bkc = '#04a4d9';		// 填充背景颜色
	}
	draw () {
		this.ctx.fillStyle = this.bkc;
		this.ctx.fillRect(0, 0, this.width, this.height);
	}
}