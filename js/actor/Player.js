import DataStore from '../base/DataStore.js';
import Sprite from '../base/Sprite.js';
import OffCanvas from '../base/OffCanvas.js';
import PlayerCanvas from '../base/PlayerCanvas.js';

const offsetLen = 4; // 偏移长度
const shineTimes = 3; // 闪烁次数
const angleStep = 6; // 角度步长

export default class Player extends Sprite {
	constructor () {
		super();
		this.dataStore = DataStore.create();
		this.offCanvas = OffCanvas.create();
		this.playerCanvas = PlayerCanvas.create();
		this.init();
		this.getBorder();	// 获取边框模型
	}
	init () {
		this.player = this.dataStore.res.get('player');

		this.angle = 90;
		this.shineCount = 0;	// 闪烁计数器

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
			left: this.playerX,
			width: this.playerWidth,
			height: this.playerHeight
		}
	}
	update () {
		// 控速
		this.timer += this.dataStore.get('deltaTime');
		if (!this.dataStore.get('isGameOver')) {
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
		// gameover
		if (this.dataStore.get('isGameOver')) {
			if (this.shineCount >= shineTimes) {
				clearInterval(this.dataStore.get('playerTimer'));
				// 清空数据
				this.dataStore.destroy();
				document.getElementById('restart').style.display = 'block';
			}
			if (this.angle < 0) {
				this.angle = 90;
				this.shineCount++;
			} 
			this.angle -= angleStep;
		}
	}
	/*
 	 * 绘制人物
 	 * 
	*/
	draw () {
		this.playerCanvas.ctx.save();
		this.playerCanvas.ctx.globalAlpha = Math.sin(this.angle * (2 * Math.PI / 360));
		// 注： x2可以缩放为1/2
		this.playerCanvas.ctx.drawImage(
			this.player,
			this.xArr[this.no] + this.no * this.playerWidth * 2, this.yAxis, this.playerWidth * 2, this.playerHeight * 2,
			this.playerX, this.playerY, this.playerWidth, this.playerHeight
		);

		this.offCanvas.ctx.drawImage(
			this.player,
			this.xArr[this.no] + this.no * this.playerWidth * 2, this.yAxis, this.playerWidth * 2, this.playerHeight * 2,
			this.playerX, this.playerY, this.playerWidth, this.playerHeight
		);
		this.ctx.restore();
		this.offCanvas.ctx.globalCompositeOperation = 'destination-in';
	}
	render () {
		this.getBorder();	// 获取边框模型
		this.update();
		this.draw();
	}
}