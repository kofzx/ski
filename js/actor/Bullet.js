import Sprite from '../base/Sprite.js';
// util
import Util from '../../utils/util.js';

// 常量
const side_length = 80;

export default class Bullet extends Sprite {
	constructor () {
		super();
		this.init();
	}
	init () {
		// arc()参数
		this.ry = 30;
		this.radius = 10;
		this.startAngle = 0;
		this.endAngle = Math.PI * 2;
		this.anticlockwise = false;
		// 起始rx需计算包含radius
		this.rx = Util.random(side_length + this.radius, this.width - side_length - this.radius);
		console.log(side_length + this.radius);
		// 颜色
		this.bkc = 'red';
		// 自身属性
		this.speed = 1.5;
	}
	// 更新数据
	update () {
		this.ry += this.speed;
		if (this.ry > this.height) {
			this.init();
		}
	}
	draw (rx, ry, radius, startAngle, endAngle, anticlockwise) {
		this.ctx.fillStyle = this.bkc;

		this.ctx.beginPath();
		this.ctx.arc(
			rx,
			ry,
			radius, 
			startAngle, 
			endAngle, 
			anticlockwise
		);
		this.ctx.closePath();

		this.ctx.fill();
	}
	render () {
		this.update();
		this.draw(
			this.rx,
			this.ry,
			this.radius, 
			this.startAngle, 
			this.endAngle, 
			this.anticlockwise
		);
	}
}