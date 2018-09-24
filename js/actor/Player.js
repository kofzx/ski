import DataStore from '../base/DataStore.js';
import Sprite from '../base/Sprite.js';

export default class Player extends Sprite {
	constructor () {
		super();
		this.init();
		this.getBorder();	// 获取边框模型
		this.dataStore = DataStore.create();
	}
	init () {
		this.bkc = '#fdb939';		// 填充背景颜色
		this.playerWidth = 60;		// 玩家宽度
		this.playerHeight = 90;		// 玩家高度
		this.playerX = this.width / 2 - this.playerWidth / 2;		// 玩家起始x坐标
		this.playerY = this.height / 2 + this.height / 2 / 3;		// 玩家起始y坐标
		this.border;	// 边框模型
	}
	// 获取边框模型
	getBorder () {
		this.border = {
			top: this.playerY,
			right: this.playerX + this.playerWidth,
			bottom: this.playerY + this.playerHeight,
			left: this.playerX
		}
	}
	update () {
		let speed = 2;
		if (this.dataStore.get('start')) {
			if (!this.dataStore.get('direction')) {
				speed = -1 * speed;
			}
			this.playerX += speed;
		}
	}
	/*
 	 * 绘制人物
 	 * 
	*/
	draw () {
		this.ctx.fillStyle = this.bkc;
		this.ctx.fillRect(this.playerX, this.playerY, this.playerWidth, this.playerHeight);
	}
	render () {
		this.getBorder();	// 获取边框模型
		this.update();
		this.draw();
	}
}