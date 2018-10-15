import Obstacle from '../base/Obstacle.js';

export default class Coin extends Obstacle {
	constructor () {
		super();
		this.init();
	}
	init () {
		this.bkc = 'gold';
	}
}