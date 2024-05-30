export class Vec {
	x: number
	y: number
	constructor(x: number, y: number) {
		this.x = x
		this.y = y
	}

	getDelta(v: Vec) {
		return new Vec(this.x - v.x, this.y - v.y)
	}
}

export class Rect {
	x: number
	y: number
	w: number
	h: number
	z: number // zoomlevel, we should break this out to some viewport info class

	constructor(x: number, y: number, w: number, h: number, z: number) {
		this.x = x
		this.y = y
		this.w = w
		this.h = h
		this.z = z
	}

	intersects(x, y, w, h) {
		return x < -this.x + this.w && x + w > -this.x && y < -this.y + this.h && y + h > -this.y
	}
}
