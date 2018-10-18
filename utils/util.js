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

/*
 * 另一种碰撞检测方法
*/
const detectIntersection = (a, b) => {
	let bCenterX = b.left + b.width/2,
	    bCenterY = b.top + b.height/2,
	    aCenterX = a.left + a.width/2,
	    aCenterY = a.top + a.height/2;

    if(
    	(Math.abs(bCenterX - aCenterX) < a.width / 2 + b.width / 2) &&
        Math.abs(bCenterY - aCenterY) < a.height / 2 + b.height / 2
    ) {
      return true;
    } else {
      return false;
    }
}

/*
 * 获取碰撞交叉的矩形区域
 * 下一步即可通过getImageData获取透明度信息
*/
const getIntersectionRect = (a, b) => {
	let maxTop = Math.max(a.top, b.top),
		minRight = Math.min(a.right, b.right),
		minBottom = Math.min(a.bottom, b.bottom),
		maxLeft = Math.max(a.left, b.left);

	return {
		top: maxTop,
		left: maxLeft,
		width: minRight - maxLeft,
		height: minBottom - maxTop
	};
}

export default {
	random,
	isStrike,
	getIntersectionRect,
	detectIntersection
}