const resources = [
	['bg', '../../res/bg.jpg'],
	['boom', '../../res/boom.png'],
	['coin', '../../res/coin.png'],
	['nb', '../../res/nb.png'],
	['player', '../../res/player.png'],
	['shore', '../../res/shore.png']
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