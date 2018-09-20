import Sprite from '../base/Sprite.js';

export default class Player extends Sprite {
	constructor () {
		super();
		this.bkc = '#fdb939';		// 填充背景颜色
		this.playerWidth = 60;		// 玩家宽度
		this.playerHeight = 90;		// 玩家高度
		this.playerX = this.width / 2 - this.playerWidth / 2;		// 玩家起始x坐标
		this.playerY = this.height / 2 + this.height / 2 / 3;		// 玩家起始y坐标
	}
	/*
 	 * 绘制人物 80 * 120
 	 * 
	*/
	draw () {
		this.ctx.fillStyle = this.bkc;
		this.ctx.fillRect(this.playerX, this.playerY, this.playerWidth, this.playerHeight);
	}
}