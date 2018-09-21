export default class DataStore {
	constructor () {
		this.data = new Map();
		this.instance = null;
	}
	static create () {
		if (!this.instance) {
			this.instance = new DataStore();
		}
		return this.instance;
	}
	add (key, value) {
		this.data.set(key, value);
	}
	getValue (key) {
		return this.data.get(key);
	}
}