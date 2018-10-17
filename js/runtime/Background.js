import Sprite from '../base/Sprite.js';
import DataStore from '../base/DataStore.js';

export default class Background extends Sprite  {
	constructor () {
		super();
		this.dataStore = DataStore.create();
		this.init();
	}
	init () {
		this.bkg = this.dataStore.res.get('bg');
	}
	draw () {
		this.ctx.drawImage(this.bkg, 0, 0, this.width, this.height);
	}
}