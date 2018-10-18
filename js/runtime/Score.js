import Sprite from '../base/Sprite.js';
import DataStore from '../base/DataStore.js';

const offset = 25;

export default class Score extends Sprite {
	constructor () {
		super();
		this.init();
	}
	init () {
		this.rx = 50;
		this.ry = 40;
		this.r = 25;
		this.scoreNum = 0;	// 分数
	}
	setClip () {
		this.ctx.save();
		this.ctx.lineWidth = 2;
		this.ctx.strokeStyle = '#999';
		this.ctx.beginPath();
		this.ctx.arc(this.rx, this.ry, this.r, 0, Math.PI * 2, false);
		this.ctx.stroke();
		this.ctx.clip();
	}
	draw () {
		this.setClip();		// 设置剪裁区域
		this.ctx.drawImage(
			DataStore.create().res.get('nb'),
			this.rx - this.r, this.ry - this.r, this.r * 2, this.r * 2
		);
		this.ctx.closePath();
		this.ctx.restore();

		// 填充文本
		this.ctx.save();
		this.ctx.font = "22px sans-serif";
		this.ctx.fillStyle = 'white';
		this.ctx.fillText(this.scoreNum, this.rx + this.r + offset, this.ry + 8);
		this.ctx.restore();
	}
}