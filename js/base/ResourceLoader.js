const resources = [
	['bg', 'https://github.com/kofzx/ski/blob/master/res/bg.jpg'],
	['boom', 'https://github.com/kofzx/ski/blob/master/res/boom.png'],
	['coin', 'https://github.com/kofzx/ski/blob/master/res/coin.png'],
	['nb', 'https://github.com/kofzx/ski/blob/master/res/nb.png'],
	['player', 'https://github.com/kofzx/ski/blob/master/res/player.png'],
	['shore', 'https://github.com/kofzx/ski/blob/master/res/shore.png']
];

export default class ResourceLoader {
	constructor () {
		this.map = new Map(resources);
		for (let [key, value] of this.map) {
			const image = new Image();
			image.src = value;
			this.map.set(key, image);
		}
	}
	onLoaded (callback) {
		let loadedCount = 0;
		for (let value of this.map.values()) {
			value.onload = () => {
				loadedCount++;
				if (loadedCount >= this.map.size) {
					callback(this.map);
				}
			}
		}
	}
}
