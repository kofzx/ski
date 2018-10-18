export default class CanvasData {
	constructor () {
		this.canvas = document.getElementById('canvas');
		this.ctx = this.canvas.getContext('2d');
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.canvas.width = this.width;
		this.canvas.height = this.height;
		this.instance = null;
	}
	static create () {
		if (!this.instance) {
			this.instance = new CanvasData();
		}
		return this.instance;
	}
}