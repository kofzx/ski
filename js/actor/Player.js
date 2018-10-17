import DataStore from '../base/DataStore.js';
import Sprite from '../base/Sprite.js';

const offsetLen = 4; // 偏移长度

export default class Player extends Sprite {
	constructor () {
		super();
		this.dataStore = DataStore.create();
		this.init();
		this.getBorder();	// 获取边框模型
	}
	init () {
		console.log();
		this.player = this.dataStore.res.get('player');

		this.playerWidth = 98;		// 玩家宽度
		this.playerHeight = 112;		// 玩家高度
		this.playerX = this.width / 2 - this.playerWidth / 2;		// 玩家起始x坐标
		this.playerY = this.height / 2 + this.height / 2 / 3;		// 玩家起始y坐标

		this.xArr = [61, 61 + 46, 61 + 46 * 2 - offsetLen, 61 + 46 * 3 - offsetLen, 61 + 46 * 3 + 82 - offsetLen];
		this.yAxis = 60;

		this.timer = 0;
		this.no = 0;	// 第几张图片

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
		// 控速
		this.timer += this.dataStore.get('deltaTime');
		if (this.timer > 100) {
			// 精灵图动画
			if (this.no >= this.xArr.length - 1) {
				this.no = 0;
			}
			this.no++;
			this.timer = 0;
		}
		// 操控指令
		if (this.dataStore.get('start')) {
			this.playerX -= this.dataStore.get('playerSpeed');
		}
	}
	/*
 	 * 绘制人物
 	 * 
	*/
	draw () {
		// 注： x2可以缩放为1/2
		this.ctx.drawImage(
			this.player,
			this.xArr[this.no] + this.no * this.playerWidth * 2, this.yAxis, this.playerWidth * 2, this.playerHeight * 2,
			this.playerX, this.playerY, this.playerWidth, this.playerHeight
		);
	}
	render () {
		this.getBorder();	// 获取边框模型
		this.update();
		this.draw();
	}
}