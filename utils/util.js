const random = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
}

/*
 * 碰撞检测
 * @param a 模型a
 * @param b 模型b
 * 注解: a, b参数为一个边框模型对象
 * e.g. a = { top: x, right: x, bottom: x, left: x }
*/
const isStrike = (a, b) => {
	if (
		a.top <= b.bottom &&
		a.bottom >= b.top &&
		a.right >= b.left &&
		a.left <= b.right
	) {
		return true;
	}
	return false;
}

export default {
	random,
	isStrike
}