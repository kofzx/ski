import Frame from './js/Frame.js';
import DataStore from './js/base/DataStore.js';
import ResourceLoader from './js/base/ResourceLoader.js';

export default class Main {
	constructor () {
		this.dataStore = DataStore.create();
		this.loader = new ResourceLoader();
		this.loader.onLoaded(map => {
			this.dataStore.res = map;
			// 图片资源加载完，才进行初始化，才进行帧循环
			this.init();
		});
	}
	init () {
		this.dataStore.add('speed', 4.5);		// 速度常量
		this.dataStore.add('pspeed', 2);	// 人物初始速度常量
		this.dataStore.add('scoreStep', 10);	// 分数步长
		// shore
		this.dataStore
			.add('shoreOffset', 25)
			.add('shoreTop', 30)
			.add('shoreScale', 1.65)
			.add('shoreWidth', 120)
			.add('shoreHeight', 500);
		new Frame();
	}
}
