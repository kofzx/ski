import Obstacle from '../base/Obstacle.js';

export default class Stone extends Obstacle {
	constructor () {
		super();
		this.init();
	}
	init () {
		this.bkc = 'black';
	}
}