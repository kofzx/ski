import Obstacle from '../base/Obstacle.js';

export default class Bullet extends Obstacle {
	constructor () {
		super();
		this.init();
	}
	init () {
		this.bkc = 'red';
	}
}