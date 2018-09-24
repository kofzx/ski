import Sprite from '../base/Sprite.js';
// util
import Util from '../../utils/util.js';

// 常量
const side_length = 80;		// 两侧障碍长度（该常量算单边的）

export default class Bullet extends Sprite {
	constructor () {
		super();
		this.init();
		this.getBorder();
	}
	init () {
		// arc()参数
		this.ry = 30;
		this.radius = 10;
		this.startAngle = 0;
		this.endAngle = Math.PI * 2;
		this.anticlockwise = false;
		// 起始rx需计算包含radius
		this.min = side_length + this.radius;				// 随机最小边界
		this.max = this.width - side_length - this.radius;	// 随机最大边界
		this.rx = Util.random(this.min, this.max);
		// 颜色
		this.bkc = 'red';
		// 自身属性
		this.speed = 2;
		this.border;	// 边框模型
	}
	// 获取边框模型
	getBorder () {
		this.border = {
			top: this.ry - this.radius,
			right: this.rx + this.radius,
			bottom: this.ry + this.radius,
			left: this.rx - this.radius
		}
	}
	// 更新数据
	update () {
		this.ry += this.speed;
	}
	draw () {
		this.ctx.fillStyle = this.bkc;

		this.ctx.beginPath();
		this.ctx.arc(
			this.rx,
			this.ry,
			this.radius, 
			this.startAngle, 
			this.endAngle, 
			this.anticlockwise
		);
		this.ctx.closePath();

		this.ctx.fill();
	}
	render () {
		this.getBorder();
		this.update();
		this.draw();
	}
}