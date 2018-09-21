import Sprite from './base/Sprite.js';
import DataStore from './base/DataStore.js';
import Background from './runtime/Background.js';
import Player from './actor/Player.js';
import Bullet from './actor/Bullet.js';

let lastTime,		// 最后更新时间
	deltaTime,		// deltaTime，距离最近时间过去了多久
	now;			// 当前时间	

export default class Frame extends Sprite {
	constructor () {
		super();
		this.dataStore = DataStore.create();
		console.log(this.dataStore);
		this.init();
	}
	clear () {
		this.ctx.clearRect(0, 0, this.width, this.height);
	}
	// 初始化
	init () {
		this.background = new Background();
		this.player = new Player();
		this.bullet = new Bullet();

		lastTime = Date.now();	

		// 帧循环
		this.update();
	}
	// 帧循环
	update () {
		// 时间更新
		now = Date.now();
		deltaTime = now - lastTime;
		lastTime = now;
		// 将deltaTime暴露为全局变量
		this.dataStore.add('lastTime', lastTime);
		let ltTime = this.dataStore.getValue('lastTime');
		console.log(ltTime);

		this.clear();
		this.render();
		let timer = window.requestAnimationFrame(() => this.update());
	}
	// 渲染层
	render () {
		console.log('render');
		this.background.draw();
		this.player.draw();
		// 动态对象
		this.bullet.render();
	}
}