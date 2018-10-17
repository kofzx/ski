import Sprite from '../base/Sprite.js';
import DataStore from '../base/DataStore.js';
import OffCanvas from '../base/OffCanvas.js';

const offset = 20;	// 固定偏移量（为了移走shore至屏幕外）

export default class BkcRight extends Sprite {
	constructor (top) {
		super();
		this.dataStore = DataStore.create();
		this.offCanvas = OffCanvas.create();
		this.top = top;
		this.init();
		this.getBorder();
	}
	init () {
		this.shore = this.dataStore.res.get('shore');

		this.swidth = this.dataStore.get('shoreWidth');
		this.sheight = this.dataStore.get('shoreHeight');
		this.scale = this.dataStore.get('shoreScale');		// 缩放比例
		this.sx = this.width - this.swidth / this.scale + offset;
	}
	getBorder () {
		this.border = {
			top: this.top,
			right: this.width,
			bottom: this.top + this.sheight / this.scale,
			left: this.sx
		}
	}
	update () {
		this.top += this.dataStore.get('speed');
	}
	draw () {
		this.ctx.drawImage(
			this.shore,
			0, 0, this.swidth * this.scale, this.sheight * this.scale,
			this.sx, this.top, this.swidth, this.sheight
		);
		// 镜像翻转
		this.ctx.translate(this.width, 0);
		this.ctx.scale(-1, 1);
		// 绘制对立面的
		this.ctx.drawImage(
			this.shore,
			0, 0, this.swidth * this.scale, this.sheight * this.scale,
			this.sx, this.top, this.swidth, this.sheight
		);
		// 翻转回来
		this.ctx.translate(this.width, 0);
		this.ctx.scale(-1, 1);

		/*
 		 * offCanvas
		*/
		this.offCanvas.ctx.drawImage(
			this.shore,
			0, 0, this.swidth * this.scale, this.sheight * this.scale,
			this.sx, this.top, this.swidth, this.sheight
		);
		// 镜像翻转
		this.offCanvas.ctx.translate(this.width, 0);
		this.offCanvas.ctx.scale(-1, 1);
		// 绘制对立面的
		this.offCanvas.ctx.drawImage(
			this.shore,
			0, 0, this.swidth * this.scale, this.sheight * this.scale,
			this.sx, this.top, this.swidth, this.sheight
		);
		// 翻转回来
		this.offCanvas.ctx.translate(this.width, 0);
		this.offCanvas.ctx.scale(-1, 1);
	}
	render () {
		this.getBorder();
		this.update();
		this.draw();
	}
}