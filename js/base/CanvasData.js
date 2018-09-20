export default class CanvasData {
	constructor () {
		this.canvas = document.getElementById('canvas');
		this.ctx = this.canvas.getContext('2d');
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		this.instance = null;
	}
	static create () {
		if (!this.instance) {
			this.instance = new CanvasData();
		}
		return this.instance;
	}
}