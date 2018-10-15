import DataStore from './base/DataStore.js';
import Sprite from './base/Sprite.js';
import Background from './runtime/Background.js';
import BackgroundSprite from './runtime/BackgroundSprite.js';
import Player from './actor/Player.js';
import Bullet from './actor/Bullet.js';
import Stone from './actor/Stone.js';
import Coin from './actor/Coin.js';
// util
import util from '../utils/util.js';

const distance = 50;	// bullet越过人物之后的一段距离
let coinsCount = 0; 	// 生成金币记录器，5个以后生成任意对象
let generateAll = false;	// 是否生成所有

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
		this.bkSprite = new BackgroundSprite();
		this.player = new Player();

		this.obstaclesExample = [Bullet, Stone];	// 障碍物标本
		this.profitsExample = [Coin];	// 收益标本
		this.allExample = this.profitsExample.concat(this.obstaclesExample);	// 所有标本

		this.obstaclesExampleLen = this.obstaclesExample.length;	// 障碍物标本长度
		this.profitsExampleLen = this.profitsExample.length;	// 收益标本长度
		this.allExampleLen = this.allExample.length;	// 所有标本长度

		this.obstacles = [];	// 障碍物集合
		this.profits = [];		// 收益集合
		this.all = [];			// 所有集合

		this.profits.push(new this.profitsExample[0]());	// 初始默认Coin

		// 时间变量
		this.lastTime, this.deltaTime, this.now;
		this.lastTime = Date.now();
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
		// 对象与人物的碰撞
		this.all.forEach(value => {
			let name = Object.getPrototypeOf(value).constructor.name;
			let isStrike = util.isStrike(this.player.border, value.border);
			if (isStrike) {
				if (name === 'Coin') {		// 金币则收集起来
					this.all.shift();
					// 新增一个Coin
					this.all.push(new this.allExample[util.random(0, this.allExampleLen - 1)]());
				} else {
					this.isGameOver = true;
				}
			}
		});
		// 金币与人物的碰撞
		this.profits.forEach(value => {
			let isStrike = util.isStrike(this.player.border, value.border);
			if (isStrike) {
				this.profits.shift();
				// 新增一个Coin
				this.profits.push(new this.profitsExample[util.random(0, this.profitsExampleLen - 1)]());
				coinsCount++;
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

		// 时间变量
		this.now = Date.now();
		this.deltaTime = this.now - this.lastTime;
		this.lastTime = this.now;

		this.dataStore.add('deltaTime', this.deltaTime);

		this.checkStrike();		// 碰撞检测
		if (!generateAll) {
			this.profits.forEach(value => {
				// 当Coin离开界面时，销毁对象
				if (value.border.bottom > this.height) {
					this.profits.shift();
				}
				// 当Coin越过人物的一段距离后，新增Coin
				if (
					value.border.top > this.player.border.bottom &&
					value.border.bottom < this.height &&
					this.profits.length === 1
				) {
					if (coinsCount < 4) {
						// 新增一个Coin
						this.profits.push(new this.profitsExample[util.random(0, this.profitsExampleLen - 1)]());
					} else {
						generateAll = true;
						// 新增一个随机对象
						this.all.push(new this.allExample[util.random(0, this.allExampleLen - 1)]());
					}
					coinsCount++;
				}
			});
		}
		if (generateAll) {
			this.all.forEach(value => {
				// 当对象离开界面时，销毁对象
				if (value.border.bottom > this.height) {
					this.all.shift();
				}
				// 当对象越过人物的一段距离后，新增对象
				if (
					value.border.top > this.player.border.bottom &&
					value.border.bottom < this.height &&
					this.all.length === 1
				) {
					// 新增一个随机对象
					this.all.push(new this.allExample[util.random(0, this.allExampleLen - 1)]());
				}
			});
		}

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
		this.bkSprite.render();
		this.player.render();
		this.profits.forEach(value => value.render());
		this.all.forEach(value => value.render());
	}
}