import Frame from './js/Frame.js';
import DataStore from './js/base/DataStore.js';
import ResourceLoader from './js/base/ResourceLoader.js';

export default class Main {
	constructor () {
		this.dataStore = DataStore.create();
		this.loader = new ResourceLoader();
		this.init();
	}
	init () {
		console.log(this.dataStore);
		this.loader.onLoaded(map => {
			console.log('onloaded');
			this.dataStore.add('res', 1);
		});
		this.dataStore.add('speed', 4.5);		// 速度常量
		this.dataStore.add('pspeed', 2);	// 人物初始速度常量
		// shore
		this.dataStore
			.add('shoreOffset', 20)
			.add('shoreTop', 30)
			.add('shoreScale', 1.7)
			.add('shoreWidth', 120)
			.add('shoreHeight', 500);
		new Frame();
	}
}
