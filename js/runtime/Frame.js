import Background from './Background.js';
import Player from '../actor/Player.js';

export default class Frame {
	constructor () {
		this.update();
	}
	update () {
		this.render();
		window.requestAnimationFrame(this.update());
	}
	render () {
		new Background().draw();
	}
}