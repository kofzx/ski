import DataStore from './base/DataStore.js';
import Sprite from './base/Sprite.js';
import OffCanvas from './base/OffCanvas.js';
import Background from './runtime/Background.js';
import BkcRight from './runtime/BkcRight.js';
import Player from './actor/Player.js';
import Bullet from './actor/Bullet.js';
import Stone from './actor/Stone.js';
import Coin from './actor/Coin.js';
// util
import util from '../utils/util.js';

export default class Frame extends Sprite {
	constructor () {
		super();
		this.dataStore = DataStore.create();
		this.offCanvas = OffCanvas.create();
		this.init();
		// 帧循环
		this.update();
	}
	// 清空画布
	clear () {
		this.ctx.clearRect(0, 0, this.width, this.height);
		this.offCanvas.ctx.clearRect(0, 0, this.width, this.height);
	}
	// 初始化
	init () {
		this.registerEvent();	// 注册事件

		this.coinsCount = 0;	// 金币计数器（用于生成规则）
		this.isGameOver = false;	// 游戏是否结束

		this.background = new Background();
		this.player = new Player();

		// 背景系列
		this.bkcRights = [
			new BkcRight(this.dataStore.get('shoreTop')),
			new BkcRight(this.dataStore.get('shoreTop') + this.dataStore.get('shoreHeight') / this.dataStore.get('shoreScale') + this.dataStore.get('shoreTop') + 5)
		];

		this.objectsExample = [Coin, Stone];	// 	所有对象标本
		this.objects = [];		// 所有对象集合

		this.objects.push(new this.objectsExample[0]());	// 初始默认Coin

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
		document.getElementById('offCanvas').addEventListener('touchstart', e => {
			e.preventDefault();
			this.dataStore.add('start', true);		// 初次点击，开始划水
			playerSpeed *= -1; 
			this.dataStore.add('playerSpeed', playerSpeed);	// 划水方向
		});
	}
	/*
	 * 生成规则
	*/
	generate () {
		if (this.coinsCount < 4) {
			// 新增一个Coin
			this.objects.push(new this.objectsExample[0]());
		} else {
			// 新增一个随机对象
			this.objects.push(new this.objectsExample[util.random(0, this.objectsExample.length - 1)]());
		}
	}
	handleEgdeCollisions (rect) {
		let imgData1 = this.offCanvas.ctx.getImageData(rect.left, rect.top, rect.width, rect.height).data;

		for(let i = 3, len = imgData1.length; i < len; i += 4) {
			console.log(imgData1[i]);
		    if(imgData1[i] > 0) {
		      console.log('撞了');
		      return true;
		    }
		}
		return false;
	}
	/**
	 *	碰撞检测
	*/
	checkStrike () {
		// 对象与人物的碰撞
		this.objects.forEach((value, index) => {
			let name = Object.getPrototypeOf(value).constructor.name;	// 对象名称
			let isStrike = util.detectIntersection(this.player.border, value.border);
			if (isStrike) {
				if (name === 'Coin') {		// 金币则收集起来
					this.objects.splice(index, 1);
					this.coinsCount++;
				} else {
					// this.isGameOver = true;
					let rectBox = util.getIntersectionRect(this.player.border, value.border);
					if (this.handleEgdeCollisions(rectBox)) this.isGameOver = true;
				}
				this.generate();
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
	// 帧循环
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

		this.objects.forEach((value, index) => {
			let name = Object.getPrototypeOf(value).constructor.name;	// 对象名称
			// 当对象离开界面时，销毁对象
			if (value.border.bottom > this.height) {
				this.objects.splice(index, 1);
			}
			// 当对象越过人物的一段距离后，新增对象
			if (
				value.border.top > this.player.border.bottom &&
				value.border.bottom < this.height &&
				this.objects.length === 1
			) {
				if (name === 'Coin') this.coinsCount++;
				this.generate();
			}
		});

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
		this.objects.forEach(value => value.render());
		this.player.render();
	}
}