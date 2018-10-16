import Sprite from '../base/Sprite.js';
import DataStore from '../base/DataStore.js';
// util
import util from '../../utils/util.js';

export default class Coin extends Sprite {
	constructor () {
		super();
		this.dataStore = DataStore.create();
		this.init();
		this.getBorder();
	}
	init () {
		this.img = new Image();
		this.img.src = '../../res/coin.png';

		this.scale = 1.2;
		this.owidth = this.img.width / this.scale;
		this.oheight = this.img.height / this.scale;

		this.min = 0 + this.dataStore.get('shoreWidth') / this.dataStore.get('shoreScale') - this.dataStore.get('shoreOffset') + this.owidth;
		this.max = this.width - this.dataStore.get('shoreWidth') / this.dataStore.get('shoreScale') + this.dataStore.get('shoreOffset') - this.owidth;
		this.ox = util.random(this.min, this.max);
		this.oy = 0;

		this.speed = this.dataStore.get('speed');		
	}
	getBorder () {
		this.border = {
			top: this.oy,
			right: this.ox + this.owidth,
			bottom: this.oy + this.oheight,
			left: this.ox
		}
	}
	// 更新数据
	update () {
		this.oy += this.speed;
	}
	draw () {
		this.ctx.drawImage(this.img, this.ox, this.oy, this.owidth, this.oheight);
	}
	render () {
		this.getBorder();
		this.update();
		this.draw();
	}
}