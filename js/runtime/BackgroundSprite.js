import Sprite from '../base/Sprite.js';

export default class BackgroundSprite extends Sprite {
	constructor () {
		super();
		this.init();
	}
	init () {
		this.bkSprite = new Image();
		this.bkSprite.src = '../../res/bg-sprite.png';
		this.speed = 2;
		this.y = 0;
	}
	update () {
		this.y -= this.speed;
	}
	draw () {
		this.ctx.drawImage(
			this.bkSprite, 
			0, this.y, this.width, this.height,
			0, 0, this.width, this.height);
	}
	render () {
		this.update();
		this.draw();
	}
}