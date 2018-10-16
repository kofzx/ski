import Sprite from './Sprite.js';
import DataStore from './DataStore.js';
// util
import util from '../../utils/util.js';

export default class Obstacle extends Sprite {
	constructor () {
		super();
		this.dataStore = DataStore.create();

		this.min = 0 + this.dataStore.get('shoreWidth') / this.dataStore.get('shoreScale') - this.dataStore.get('shoreOffset');
		this.max = this.width - this.dataStore.get('shoreWidth') / this.dataStore.get('shoreScale') + this.dataStore.get('shoreOffset');
		this.ox = util.random(this.min, this.max);
		this.oy = 0;

		this.speed = this.dataStore.get('speed');
	}
}