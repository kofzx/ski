export default class DataStore {
	constructor () {
		this.data = new Map();
	}
	static create () {
		if (!DataStore.instance) {
			DataStore.instance = new DataStore();
		}
		return DataStore.instance;
	}
	add (key, value) {
		this.data.set(key, value);
	}
	get (key) {
		return this.data.get(key);
	}
}