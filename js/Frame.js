import DataStore from './base/DataStore.js';
import Sprite from './base/Sprite.js';
import Background from './runtime/Background.js';
import BkcRight from './runtime/BkcRight.js';
import Player from './actor/Player.js';
import Bullet from './actor/Bullet.js';
import Stone from './actor/Stone.js';
import Coin from './actor/Coin.js';
// util
import util from '../utils/util.js';

let coinsCount = 0; 	// 生成金币记录器，5个以后生成任意对象
let generateAll = false;	// 是否生成所有

export default class Frame extends Sprite {
	constructor () {
		super();
		this.dataStore = DataStore.create();
		this.isGameOver = false;	// 游戏是否结束
		this.init();
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

		this.obstaclesExample = [Bullet, Stone];	// 障碍物标本
		this.profitsExample = [Coin];	// 收益标本
		this.allExample = this.profitsExample.concat(this.obstaclesExample);	// 所有标本

		this.obstaclesExampleLen = this.obstaclesExample.length;	// 障碍物标本长度
		this.profitsExampleLen = this.profitsExample.length;	// 收益标本长度
		this.allExampleLen = this.allExample.length;	// 所有标本长度

		// 背景系列
		this.bkcRights = [
			new BkcRight(this.dataStore.get('shoreTop')),
			new BkcRight(this.dataStore.get('shoreTop') + this.dataStore.get('shoreHeight') / this.dataStore.get('shoreScale') + this.dataStore.get('shoreTop') + 5)
		];

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
		let playerSpeed = this.dataStore.get('pspeed');
		this.canvas.addEventListener('touchstart', e => {
			e.preventDefault();
			this.dataStore.add('start', true);		// 初次点击，开始划水
			playerSpeed *= -1; 
			this.dataStore.add('playerSpeed', playerSpeed);	// 划水方向
		});
	}
	/**
	 *	碰撞检测
	*/
	checkStrike () {
		// 对象与人物的碰撞
		this.all.forEach(value => {
			let name = Object.getPrototypeOf(value).constructor.name;
			console.log(name);
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
			this.player.border.left <= 0 + this.dataStore.get('shoreWidth') / this.dataStore.get('shoreScale') - this.dataStore.get('shoreOffset') ||
			this.player.border.right >= this.width - this.dataStore.get('shoreWidth') / this.dataStore.get('shoreScale') + this.dataStore.get('shoreOffset')
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

		let lastRight = this.bkcRights[this.bkcRights.length - 1];	// 最后一个bkcRights
		// 新增"岸边"规则
		if (
			lastRight.border.bottom >= this.height &&
			this.bkcRights.length === 2
		) {
			this.bkcRights.unshift(new BkcRight(-this.dataStore.get('shoreHeight') / this.dataStore.get('shoreScale')));
		}
		// 当最后一个"岸边"离开界面时，销毁对象
		if (
			lastRight.border.top >= this.height &&
			this.bkcRights.length === 3
		) {
			this.bkcRights.pop();
		}
		if (!generateAll) {
			console.log('generateCoins');
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
			console.log('generateAll');
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
		this.bkcRights.forEach(value => value.render());
		this.player.render();
		this.profits.forEach(value => value.render());
		this.all.forEach(value => value.render());
	}
}