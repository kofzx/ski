import DataStore from './base/DataStore.js';
import Sprite from './base/Sprite.js';
import Background from './runtime/Background.js';
import Player from './actor/Player.js';
import Bullet from './actor/Bullet.js';
// util
import Util from '../utils/util.js';

const distance = 50;	// bullet越过人物之后的一段距离

export default class Frame extends Sprite {
	constructor () {
		super();
		this.init();
		this.dataStore = DataStore.create();
		this.isGameOver = false;	// 游戏是否结束
		// 帧循环
		this.update();
	}
	// 清空画布
	clear () {
		this.ctx.clearRect(0, 0, this.width, this.height);
	}
	// 初始化
	init () {
		this.registerEvent();	// 注册事件
		this.background = new Background();
		this.player = new Player();
		this.bullets = [];
		this.bullets.push(new Bullet());
	}
	// 注册事件
	registerEvent () {
		let direction = false;		// 划水方向，初始向左
		this.canvas.addEventListener('touchstart', e => {
			e.preventDefault();
			direction = !direction;
			this.dataStore.add('start', true);		// 初次点击，开始划水
			this.dataStore.add('direction', direction);	// 划水方向
		});
	}
	/**
	 *	碰撞检测
	*/
	checkStrike () {
		// 障碍与人物的碰撞
		this.bullets.forEach(value => {
			let isStrike = Util.isStrike(this.player.border, value.border);
			if (isStrike) {
				this.isGameOver = true;
			}
		});
		// 人物与墙壁的碰撞
		if (
			this.player.border.left <= 0 ||
			this.player.border.right >= this.width
		) {
			this.isGameOver = true;
		}
	}
	// 帧循环 （业务逻辑写在这）
	update () {
		this.checkStrike();		// 碰撞检测
		this.bullets.forEach(value => {
			// 当bullet离开界面时，销毁对象
			if (value.border.bottom > this.height) {
				// console.log('shift');
				this.bullets.shift();
			}
			// 当bullet越过人物的一段距离后，新增bullet对象
			if (
				value.border.top > this.player.border.bottom &&
				value.border.bottom < this.height &&
				this.bullets.length === 1
			) {
				this.bullets.push(new Bullet());
			}
		});
		// console.log(this.bullets);

		this.clear();
		this.render();
		let timer = window.requestAnimationFrame(() => this.update());
		if (this.isGameOver) {	// 结束游戏
			window.cancelAnimationFrame(timer);
		}
	}
	// 渲染层
	render () {
		this.background.draw();
		// 动态对象
		this.player.render();
		this.bullets.forEach(value => value.render());
	}
}